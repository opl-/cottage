/**
 *
 * Code written by therne in 2016. 4. 16.
 */
'use strict';
 
var routes = [
    "/authorizations",
    "/authorizations/:id",
    "/applications/:client_id/tokens/:access_token",
    "/events",
    "/repos/:owner/:repo/events",
    "/networks/:owner/:repo/events",
    "/orgs/:org/events",
    "/users/:user/received_events",
    "/users/:user/received_events/public",
    "/users/:user/events",
    "/users/:user/events/public",
    "/users/:user/events/orgs/:org",
    "/feeds",
    "/notifications",
    "/repos/:owner/:repo/notifications",
    "/notifications/threads/:id",
    "/notifications/threads/:id/subscription",
    "/repos/:owner/:repo/stargazers",
    "/users/:user/starred",
    "/user/starred",
    "/user/starred/:owner/:repo",
    "/repos/:owner/:repo/subscribers",
    "/users/:user/subscriptions",
    "/user/subscriptions",
    "/repos/:owner/:repo/subscription",
    "/user/subscriptions/:owner/:repo",
    "/users/:user/gists",
    "/gists",
    "/gists/:id",
    "/gists/:id/star",
    "/repos/:owner/:repo/git/blobs/:sha",
    "/repos/:owner/:repo/git/commits/:sha",
    "/repos/:owner/:repo/git/refs",
    "/repos/:owner/:repo/git/tags/:sha",
    "/repos/:owner/:repo/git/trees/:sha",
    "/issues",
    "/user/issues",
    "/orgs/:org/issues",
    "/repos/:owner/:repo/issues",
    "/repos/:owner/:repo/issues/:number",
    "/repos/:owner/:repo/assignees",
    "/repos/:owner/:repo/assignees/:assignee",
    "/repos/:owner/:repo/issues/:number/comments",
    "/repos/:owner/:repo/issues/:number/events",
    "/repos/:owner/:repo/labels",
    "/repos/:owner/:repo/labels/:name",
    "/repos/:owner/:repo/issues/:number/labels",
    "/repos/:owner/:repo/milestones/:number/labels",
    "/repos/:owner/:repo/milestones",
    "/repos/:owner/:repo/milestones/:number",

    "/emojis",
    "/gitignore/templates",
    "/gitignore/templates/:name",

    "/meta",
    "/rate_limit",

    "/users/:user/orgs",
    "/user/orgs",
    "/orgs/:org",

    "/orgs/:org/members",
    "/orgs/:org/members/:user",

    "/orgs/:org/public_members",
    "/orgs/:org/public_members/:user",

    "/orgs/:org/teams",
    "/teams/:id",

    "/teams/:id/members",
    "/teams/:id/members/:user",
    "/teams/:id/repos",
    "/teams/:id/repos/:owner/:repo",
    "/user/teams",
    "/repos/:owner/:repo/pulls",
    "/repos/:owner/:repo/pulls/:number",
    "/repos/:owner/:repo/pulls/:number/commits",
    "/repos/:owner/:repo/pulls/:number/files",
    "/repos/:owner/:repo/pulls/:number/merge",
    "/repos/:owner/:repo/pulls/:number/comments",
    "/user/repos",
    "/users/:user/repos",
    "/orgs/:org/repos",
    "/repositories",
    "/repos/:owner/:repo",
    "/repos/:owner/:repo/contributors",
    "/repos/:owner/:repo/languages",
    "/repos/:owner/:repo/teams",
    "/repos/:owner/:repo/tags",
    "/repos/:owner/:repo/branches",
    "/repos/:owner/:repo/branches/:branch",
    "/repos/:owner/:repo/collaborators",
    "/repos/:owner/:repo/collaborators/:user",
    "/repos/:owner/:repo/comments",
    "/repos/:owner/:repo/commits/:sha/comments",
    "/repos/:owner/:repo/comments/:id",
    "/repos/:owner/:repo/commits",
    "/repos/:owner/:repo/commits/:sha",
    "/repos/:owner/:repo/readme",
    "/repos/:owner/:repo/keys",
    "/repos/:owner/:repo/keys/:id",
    "/repos/:owner/:repo/downloads",
    "/repos/:owner/:repo/downloads/:id",
    "/repos/:owner/:repo/forks",
    "/repos/:owner/:repo/hooks",
    "/repos/:owner/:repo/hooks/:id",
    "/repos/:owner/:repo/releases",
    "/repos/:owner/:repo/releases/:id",
    "/repos/:owner/:repo/releases/:id/assets",
    "/repos/:owner/:repo/stats/contributors",
    "/repos/:owner/:repo/stats/commit_activity",
    "/repos/:owner/:repo/stats/code_frequency",
    "/repos/:owner/:repo/stats/participation",
    "/repos/:owner/:repo/stats/punch_card",
    "/repos/:owner/:repo/statuses/:ref",
    "/search/repositories",
    "/search/code",
    "/search/issues",
    "/search/users",
    "/legacy/issues/search/:owner/:repository/:state/:keyword",
    "/legacy/repos/search/:keyword",
    "/legacy/user/search/:keyword",
    "/legacy/user/email/:email",
    "/users/:user",
    "/user",
    "/users",
    "/user/emails",
    "/users/:user/followers",
    "/user/followers",
    "/users/:user/following",
    "/user/following",
    "/user/following/:user",
    "/users/:user/following/:target_user",
    "/users/:user/keys",
    "/user/keys",
    "/user/keys/:id",

    "/v1/payments/payment",
    "/v1/payments/payment/:PaymentId/execute",




    "/v1/payments/sale/:Id/refund",


    "/v1/payments/authorization/:AuthorizationId/capture",
    "/v1/payments/authorization/:AuthorizationId/void",
    "/v1/payments/authorization/:AuthorizationId/reauthorize",

    "/v1/payments/capture/:CaptureId/refund",


    "/v1/payments/v1/payments/billingagreements",
    "/v1/payments/billingagreements/",


    "/v1/payments/billingagreements/:AgreementId/suspend",
    "/v1/payments/billingagreements/:AgreementId/reactivate",
    "/v1/payments/billingagreements/:AgreementId/cancel",
    "/v1/payments/billingagreements/:AgreementId/setbalance",
    "/v1/payments/billingagreements/:AgreementId/billbalance",

    "/v1/payments/orders/:OrderId/authorize",
    "/v1/payments/orders/:OrderId/capture",
    "/v1/payments/orders/:OrderId/dovoid",
    "/v1/payments/payouts",


    "/v1/payments/payoutsitem/:PayoutItemId/cancel",
    "/v1/vault/creditcards",




    "/v1/identity/openidconnect/tokenservice",
    "/v1/invoicing/invoices",
    "/v1/invoicing/invoices/:InvoiceId/send",



    "/v1/invoicing/search",
    "/v1/invoicing/invoices/:InvoiceId/remind",
    "/v1/invoicing/invoices/:InvoiceId/cancel",

    "/v1/invoicing/invoices/:invoiceid/recordpayment",
    "/v1/invoicing/invoices/:invoiceid/recordrefund",
    "/v1/paymentexperience/webprofiles",
    "/v1/notifications/webhooks",
    "/v1/notifications/webhooksevents/:EventId/resend",
    "/v1/notifications/simulateevent",

    "/cmd.html",
    "/code.html",
    "/contrib.html",
    "/contribute.html",
    "/debugging_with_gdb.html",
    "/docs.html",
    "/effective_go.html",
    "/files.log",
    "/gccgo_contribute.html",
    "/gccgo_install.html",
    "/go-logo-black.png",
    "/go-logo-blue.png",
    "/go-logo-white.png",
    "/go1.1.html",
    "/go1.2.html",
    "/go1.html",
    "/go1compat.html",
    "/go_faq.html",
    "/go_mem.html",
    "/go_spec.html",
    "/help.html",
    "/ie.css",
    "/install-source.html",
    "/install.html",
    "/logo-153x55.png",
    "/Makefile",
    "/root.html",
    "/share.png",
    "/sieve.gif",
    "/tos.html",
    "/articles/",
    "/articles/go_command.html",
    "/articles/index.html",
    "/articles/wiki/",
    "/articles/wiki/edit.html",
    "/articles/wiki/final-noclosure.go",
    "/articles/wiki/final-noerror.go",
    "/articles/wiki/final-parsetemplate.go",
    "/articles/wiki/final-template.go",
    "/articles/wiki/final.go",
    "/articles/wiki/get.go",
    "/articles/wiki/http-sample.go",
    "/articles/wiki/index.html",
    "/articles/wiki/Makefile",
    "/articles/wiki/notemplate.go",
    "/articles/wiki/part1-noerror.go",
    "/articles/wiki/part1.go",
    "/articles/wiki/part2.go",
    "/articles/wiki/part3-errorhandling.go",
    "/articles/wiki/part3.go",
    "/articles/wiki/test.bash",
    "/articles/wiki/test_edit.good",
    "/articles/wiki/test_Test.txt.good",
    "/articles/wiki/test_view.good",
    "/articles/wiki/view.html",
    "/codewalk/",
    "/codewalk/codewalk.css",
    "/codewalk/codewalk.js",
    "/codewalk/codewalk.xml",
    "/codewalk/functions.xml",
    "/codewalk/markov.go",
    "/codewalk/markov.xml",
    "/codewalk/pig.go",
    "/codewalk/popout.png",
    "/codewalk/run",
    "/codewalk/sharemem.xml",
    "/codewalk/urlpoll.go",
    "/devel/",
    "/devel/release.html",
    "/devel/weekly.html",
    "/gopher/",
    "/gopher/appenginegopher.jpg",
    "/gopher/appenginegophercolor.jpg",
    "/gopher/appenginelogo.gif",
    "/gopher/bumper.png",
    "/gopher/bumper192x108.png",
    "/gopher/bumper320x180.png",
    "/gopher/bumper480x270.png",
    "/gopher/bumper640x360.png",
    "/gopher/doc.png",
    "/gopher/frontpage.png",
    "/gopher/gopherbw.png",
    "/gopher/gophercolor.png",
    "/gopher/gophercolor16x16.png",
    "/gopher/help.png",
    "/gopher/pkg.png",
    "/gopher/project.png",
    "/gopher/ref.png",
    "/gopher/run.png",
    "/gopher/talks.png",
    "/gopher/pencil/",
    "/gopher/pencil/gopherhat.jpg",
    "/gopher/pencil/gopherhelmet.jpg",
    "/gopher/pencil/gophermega.jpg",
    "/gopher/pencil/gopherrunning.jpg",
    "/gopher/pencil/gopherswim.jpg",
    "/gopher/pencil/gopherswrench.jpg",
    "/play/",
    "/play/fib.go",
    "/play/hello.go",
    "/play/life.go",
    "/play/peano.go",
    "/play/pi.go",
    "/play/sieve.go",
    "/play/solitaire.go",
    "/play/tree.go",
    "/progs/",
    "/progs/cgo1.go",
    "/progs/cgo2.go",
    "/progs/cgo3.go",
    "/progs/cgo4.go",
    "/progs/defer.go",
    "/progs/defer.out",
    "/progs/defer2.go",
    "/progs/defer2.out",
    "/progs/eff_bytesize.go",
    "/progs/eff_bytesize.out",
    "/progs/eff_qr.go",
    "/progs/eff_sequence.go",
    "/progs/eff_sequence.out",
    "/progs/eff_unused1.go",
    "/progs/eff_unused2.go",
    "/progs/error.go",
    "/progs/error2.go",
    "/progs/error3.go",
    "/progs/error4.go",
    "/progs/go1.go",
    "/progs/gobs1.go",
    "/progs/gobs2.go",
    "/progs/image_draw.go",
    "/progs/image_package1.go",
    "/progs/image_package1.out",
    "/progs/image_package2.go",
    "/progs/image_package2.out",
    "/progs/image_package3.go",
    "/progs/image_package3.out",
    "/progs/image_package4.go",
    "/progs/image_package4.out",
    "/progs/image_package5.go",
    "/progs/image_package5.out",
    "/progs/image_package6.go",
    "/progs/image_package6.out",
    "/progs/interface.go",
    "/progs/interface2.go",
    "/progs/interface2.out",
    "/progs/json1.go",
    "/progs/json2.go",
    "/progs/json2.out",
    "/progs/json3.go",
    "/progs/json4.go",
    "/progs/json5.go",
    "/progs/run",
    "/progs/slices.go",
    "/progs/timeout1.go",
    "/progs/timeout2.go",
    "/progs/update.bash",

    "/statuses/mentions_timeline",
    "/statuses/user_timeline",
    "/statuses/home_timeline",
    "/statuses/retweets_of_me",
    "/statuses/retweets/:id",
    "/statuses/show/:id",
    "/statuses/oembed",
    "/statuses/retweeters/ids",
    "/statuses/lookup",
    "/direct_messages/sent",
    "/direct_messages/show",
    "/search/tweets",
    "/direct_messages",
    "/friendships/no_retweets/ids",
    "/friends/ids",
    "/followers/ids",
    "/friendships/incoming",
    "/friendships/outgoing",
    "/friendships/show",
    "/friends/list",
    "/followers/list",
    "/friendships/lookup",
    "/account/settings",
    "/account/verify_credentials",
    "/blocks/list",
    "/blocks/ids",
    "/user/lookup",
    "/user/show",
    "/user/search",
    "/user/profile_banner",
    "/mutes/users/ids",
    "/mutes/users/list",
    "/user/suggestions/:slug",
    "/user/suggestions",
    "/user/suggestions/:slug/members",
    "/favorites/list",
    "/lists/list",
    "/lists/statuses",
    "/lists/memberships",
    "/lists/subscribers",
    "/lists/subscribers/show",
    "/lists/members/show",
    "/lists/members",
    "/lists/show",
    "/lists/subscriptions",
    "/lists/ownerships",
    "/saved_searches/list",
    "/saved_searches/show/:id",
    "/geo/id/:place_id",
    "/geo/reverse_geocode",
    "/geo/search",
    "/trends/place",
    "/trends/available",
    "/application/rate_limit_status",
    "/help/configuration",
    "/help/languages",
    "/help/privacy",
    "/help/tos",
    "/trends/closest",
];

exports.api = routes.map(x => ['GET', x]);