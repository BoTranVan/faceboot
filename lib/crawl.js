var fb = require("fb")

// Using to crwal informations form res.paging.next
function crawlNext(object_id, urlPath, callback) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)
    if (typeof(callback) != "object") {
        wlogs.writeErrors("(12. crawl.js) Callback must be a object")
        return
    }
    if (typeof(urlPath) == "string" && urlPath.search("https://graph.facebook.com/v2.12/") == 0 && typeof(object_id) == "string") {
        var urlPath = urlPath.split("https://graph.facebook.com/v2.12/")[1]
        wlogs.writeMessages("(15. crawl.js) next: " + urlPath)
        console.log("(1. crawl.js) next: " + urlPath)
        fb.api(urlPath, (res) => {
            if (res.error) {
                wlogs.writeErrors("(19. crawl.js)" + object_id + " haved " + res.error.message);
                return;
            }
            if (res.data.length != 0) {
                for (var i = res.data.length - 1; i >= 0; i--) {
                    wlogs.writeMessages("crawl: " + object_id + " haved " + res.data[i].id)
                    for (var j = callback.length - 1; i >= 0; i--) {
                        callback[j](res.data[i].id)
                    }
                };
                if (typeof(res.paging.next) == "string") {
                    crawlNext(res.paging.next)
                };
            } else {
                wlogs.writeMessages("Haven't crwaled from " + urlPath + "\n")
                console.log("haven't crwaled from " + urlPath)
            };
        })
    };
}

module.exports = {
    crawlNext: crawlNext
}