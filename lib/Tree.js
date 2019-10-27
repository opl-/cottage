const Node = require('./Node');
const Path = require('path');
const util = require('util');
const compose = require('koa-compose');

/**
 * Routing tree.
 * @private
 */
function Tree(options = {}) {
    this.options = Object.assign({
        rootPath: '/',
        strictMode: false,
        caseSensitive: false,
    }, options);

    this.rootPath = this.options.rootPath;
    this.rootNode = new Node(this.rootPath);
    this.leafNodes = {};
    this.rootPathLength = this.rootNode.path.length;
    this.defaultHandler = null;
}

/**
 * Add a new node to the tree.
 * @returns {Node} created node
 */
Tree.prototype.add = function(path) {
    if (path === this.rootPath) return this.rootNode;

    let parentNode = this.rootNode;
    let pathLen = path.length, depth = this.rootPathLength; // skip rootPath

    while (depth < pathLen) {
        let node = parentNode.letterTable[path.charCodeAt(depth) - 32]
                || parentNode.paramChildNode;
        if (!node) {
            let newNode = new Node(path.substring(depth));
            return parentNode.addChild(newNode);
        }

        let nodePathLen = node.path.length,
            currPathLen = pathLen - depth,
            paramLen = 0, i, pi;

        for (pi = 1, i = depth+1; pi < node.path.length && i < pathLen; pi++) {
            // branch
            if (path[i] !== node.path[pi]) {
                return node.branch(depth, i, pi, parentNode, path);
            }
            else i++;
        }
        if (node.isParamNode) {
            let endIndex = path.indexOf('/', i);
            if (endIndex < 0) endIndex = pathLen;
            paramLen += (endIndex - i);
            i = endIndex;
        }

        // reached at the end
        if (i === pathLen) {
            // more characters are left - branch it
            if (currPathLen - paramLen < nodePathLen) {
                return node.branchUpper(depth, pi, parentNode, path);
            }
            return node;
        }

        // seems okay now
        parentNode = node;
        depth = i;
    }

    // cannot possible
    throw new Error("something had been wrong");
};

/**
 * Add handler node.
 * @param {String} method
 * @param {String} path
 * @param {GeneratorFunction} handler
 */
Tree.prototype.addHandler = function(method, path, handler) {
    let newNode = this.add(path);
    if (newNode.hasHandler(method)) {
        let existing = newNode.getHandler(method);
        newNode.setHandler(method, compose([existing, handler]));
        return;
    }
    newNode.setHandler(method, handler);
    this.leafNodes[path] = newNode;
};

/**
 * Add middleware node (a.k.a lazy node)
 *  that will be executed in spite of not found error.
 * @param {String} method
 * @param {String} path
 * @param {GeneratorFunction} middleware
 */
Tree.prototype.addMiddleware = function(method, path, middleware) {
    let newNode = this.add(path);
    newNode.setLazyHandler(middleware);
    this.leafNodes[path] = newNode;
};

/**
 * Locate the handler matches with given path in the tree.
 * @param {string} method
 * @param {string} path that starts with '/'
 * @param {object} params
 * @returns {GeneratorFunction}
 */
Tree.prototype.locate = function(method, path, params) {
    // case insensitive mode
    const originalPath = path;
    if (!this.options.caseSensitive) path = path.toLowerCase();

    let depth = 0, pathLen = path.length;
    let paramLenSum = 0, nodeLenSum = 0;
    let node = this.rootNode, leastWorst = this.defaultHandler;

    if (path === this.rootPath) return this.rootNode.getHandler(method) || leastWorst;

    // skip last slash when it's not on strict mode
    if (!this.options.strictMode && path[pathLen-1] === '/') pathLen--;

    while (depth < pathLen) {
        // let's check prefix
        if (path.indexOf(node.path, depth) !== depth) return leastWorst;
        depth += node.pathLength;

        if (node.isLazyNode) leastWorst = node.lazyHandler;

        if (node.isParamNode) {
            let endIndex = path.indexOf('/', depth);
            if (endIndex < 0) endIndex = pathLen;
            if (depth >= endIndex) return leastWorst;
            params[node.paramName] = originalPath.slice(depth, endIndex);

            paramLenSum += (endIndex - depth);
            depth += (endIndex - depth);
        }
        nodeLenSum += node.pathLength;

        // has reached at the end of given path?
        if (depth === pathLen) {
            if (node.hasHandler(method) && depth - paramLenSum === nodeLenSum) {
                return node.getHandler(method) || leastWorst;
            }
            else return leastWorst;
        }

        // go deeper
        node = node.letterTable[path.charCodeAt(depth) - 32] || node.paramChildNode;
        if (!node) return leastWorst;
    }
    return leastWorst;
};

/**
 * Mount and merge a tree onto the given path.
 * @param {string} path
 * @param {Tree} tree
 */
Tree.prototype.merge = function(path, tree) {
    if (tree.options.caseSensitive !== this.options.caseSensitive || tree.options.strictMode !== this.options.strictMode) {
        console.warn("cottage: warn: path routing option of child router (strict mode, case sensitive... ) " +
            "is different to the parent's. Ignoring...");
    }
    let newNode = this.add(path);
    newNode.override(tree.rootNode);
    newNode.setLazyHandler(tree.defaultHandler);
    if (newNode.paramChildNode) {
        newNode.paramChildNode.setPath(newNode.paramChildNode.path + '/');
    } else if (newNode.path[newNode.pathLength - 1] !== '/' && newNode.childCount > 0) {
        let slashNode = new Node('/');

        // transfer children of new node to the slash(/) node
        slashNode.letterTable = newNode.letterTable;
        slashNode.childCount = newNode.childCount;
        newNode.letterTable = [];
        newNode.childCount = 0;

        // and attach slash to new node
        newNode.addChild(slashNode);
    }
};

/**
 * Traverse each node which has a handler.
 * @param {Function} callback
 */
Tree.prototype.traverse = function(callback) {
    for (let path in this.leafNodes) callback(path, this.leafNodes[path]);
};

/**
 * @returns {Tree} A copy of the tree.
 */
Tree.prototype.clone = function() {
    let clone = new Tree(this.options);
    let tree = this;
    clone.rootNode = cloneNode(this.rootNode);
    clone.defaultHandler = tree.defaultHandler;

    function cloneNode(node, path) {
        if (!path) path = tree.rootPath;
        let copyNode = new Node(node.path);
        copyNode.override(node);

        // fill leafNodes info
        if (Object.keys(copyNode.handlers).length > 0 || copyNode.lazyHandler) {
            clone.leafNodes[path] = copyNode;
        }

        // clone children
        for (const child of node.letterTable) {
            if (child) copyNode.addChild(cloneNode(child, path + child.path));
        }
        if (node.paramChildNode) {
            copyNode.paramChildNode = cloneNode(node.paramChildNode, path + node.paramChildNode.path);
        }
        return copyNode;
    }
    return clone;
};

/**
 * Changes rootNode Path. (default is '/')
 */
Tree.prototype.setRootPath = function(path) {
    this.rootNode.setPath(path);
    this.rootPath = path;
    this.rootPathLength = path.length;

    // update leafNodes info
    let oldPaths = Object.keys(this.leafNodes);
    if (oldPaths.length > 0) {
        let newLeafNodes = {};
        let self = this;
        oldPaths.forEach(function(oldPath) {
            newLeafNodes[Path.join(path, oldPath)] = self.leafNodes[oldPath];
        });
        this.leafNodes = newLeafNodes;
    }
};

/**
 * For debug purpose.
 */
Tree.prototype.visualize = function() {
    console.log(util.inspect(this.export(), false, 30, true));
};

Tree.prototype.export = function() {
    return (function _export(node) {
        let data = {
            path: node.path,
            handler: node.handlers,
        };
        if (node.isParamNode) data.paramName = node.paramName;

        data.children = [];
        node.letterTable.forEach(function(child) {
            if (child !== null) data.children.push(_export(child));
        });
        if (node.paramChildNode) {
            data.paramChildNode = _export(node.paramChildNode);
        }
        return data;
    })(this.rootNode);
};

module.exports = Tree;
