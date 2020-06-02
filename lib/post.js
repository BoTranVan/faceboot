var fb = require("fb");


//  Using to post a status
module.exports.postStatus = function postStatus(object_id) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    var doActions = require("./doActions")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)
    var content = config.post.postStatus[Math.floor(Math.random() * config.post.postStatus.length)].content


    if (typeof(object_id) == "string" && typeof(content) == "object") {
        fb.api(object_id + "/feed/", "post", content, (res) => {
            if (!res || res.error) {
                wlogs.writeErrors("(17. post.js)" + object_id + " - " + JSON.stringify(res));
                return;
            }
        });
    };
}

//  Using to post a comment
module.exports.postComment = function postComment(object_id) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)
        // var delay = delay != undefined ? delay : 5000


    if (typeof(object_id) == "string") {

        fb.api(object_id + "?fields=comments.limit(100000){from}", (resc) => {
            // console.log(recs.comments)
            if (resc.error) {
                wlogs.writeErrors("(38. post.js)" + object_id + " - " + JSON.stringify(resc));
                return;
            }
            if (resc.comments.count == "0") {
                doComment(object_id)
            } else {
                if (resc.comments.data) {
                    var i = resc.comments.data.length
                    do {
                        --i
                        // console.log(resc.comments.data[i])
                        if (resc.comments.data[i].from.id == config.account.userID) {
                            wlogs.writeMessages("Found " + resc.comments.data[i].from.id + " commented " + resc.comments.data[i].message)
                            return
                        };
                    } while ((resc.comments.data[i].from.id !== config.account.userID) && i > 0)
                    doComment(object_id)
                }
            };
        });
    };
}

function doComment(object_id) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    var doActions = require("./doActions")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)
        //  Do post comment
    var message = config.post.postComment[Math.floor(Math.random() * config.post.postComment.length)].content
    fb.api(object_id + "/comments/", "post", message, (res) => {
            if (!res || res.error) {
                wlogs.writeErrors("(71. post.js)" + object_id + " - " + JSON.stringify(res));
                return;
            }
            if (res.id) {
                wlogs.writeMessages("comment success(results): " + object_id + ":" + res.id + " - " + message.message)
            };
        })
        // End do
}

//  Using to get object_id of new post
module.exports.scanIdNewPost = function scanIdNewPost(object_id, min, max) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    var doActions = require("./doActions")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)


    if (typeof(object_id) == "string") {

        if (typeof(config.post.timeStamp) == "string" && typeof(Number(config.post.timeStamp)) == "number") {
            var timeStamp = config.post.timeStamp
        } else {
            var timeStamp = new Date()
            var y = timeStamp.getFullYear()
            var mo = "-" + ((timeStamp.getMonth() < 9) ? ("0" + (timeStamp.getMonth() + 1)) : (timeStamp.getMonth() + 1))
            var d = "-" + timeStamp.getUTCDate()
            var h = "T" + (timeStamp.getUTCHours() - 1)
            var mi = ":" + ((timeStamp.getMinutes() < 10) ? ("0" + timeStamp.getMinutes()) : timeStamp.getMinutes())
            var mil = ":" + timeStamp.getSeconds()
            var timeStamp = y + mo + d + h + mi + mil
        };


        //  Using debug
        // console.log(timeStamp)
        console.log("Starting get post's id of " + object_id)
        fb.api(object_id + "/feed/?since=" + timeStamp + "&limit(1000)", (res) => {
            if (res.error) {
                wlogs.writeErrors("(111. post.js)" + object_id + " - " + JSON.stringify(res));
                return;
            }

            if (typeof(res.data) == "object") {
                wlogs.writeMessages(object_id + " have " + res.data.length + " new post(s):")
                for (var i = res.data.length - 1; i >= 0; i--) {
                    var delay = delay != undefined ? require("./delay").getDelay(min, max) : 5000
                    if (res.data[i].story) {
                        // Check post was tagged?
                        if (res.data[i].story.indexOf(" — with ") > 0 || res.data[i].story.indexOf(" is with ") > 0 || res.data[i].story.indexOf("  — feeling ") > 0) {
                            continue
                        } else {
                            wlogs.writeMessages(res.data[i].id)
                            doActions.run(res.data[i].id, delay)
                        }
                    } else {
                        wlogs.writeMessages(res.data[i].id)
                        doActions.run(res.data[i].id, delay)
                    }
                };
                if (typeof(res.paging.next) == "string") {
                    wlogs.writeMessages("continue crwal of " + object_id)
                    console.log("continue crwal of " + object_id)
                        // console.log(res.paging.next)
                    crawlNext(object_id, res.paging.next, delay)
                };
            } else {
                wlogs.writeMessages("(142. post.js) No data response(data) from " + object_id)
            };
        })
    };
}

function crawlNext(object_id, urlPath, min, max) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    var doActions = require("./doActions")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)

    if (typeof(urlPath) == "string" && urlPath.search("https://graph.facebook.com/v2.12/") == 0 && typeof(object_id) == "string") {
        var urlPath = urlPath.split("https://graph.facebook.com/v2.12/")[1]
        wlogs.writeMessages("(156. post.js) paging.next: " + urlPath)
        console.log("paging.next: " + urlPath)
        fb.api(urlPath, (res) => {
            if (res.error) {
                wlogs.writeErrors("(160. post.js)" + object_id + " haved " + JSON.stringify(res));
                return;
            }
            if (res.data.length != 0) {
                wlogs.writeMessages(object_id + " haved " + res.data.length + " post(s):")
                for (var i = res.data.length - 1; i >= 0; i--) {
                    var delay = delay != undefined ? require("./delay").getDelay(min, max) : 5000
                    if (res.data[i].story) {
                        // Check post was tagged?
                        if (res.data[i].story.indexOf(" — with ") > 0 || res.data[i].story.indexOf(" is with ") > 0 || res.data[i].story.indexOf(" — feeling ") > 0) {
                            continue
                        } else {
                            wlogs.writeMessages(res.data[i].id)
                            doActions.run(res.data[i].id, delay)
                        }
                    } else {
                        wlogs.writeMessages(res.data[i].id)
                        doActions.run(res.data[i].id, delay)
                    }
                };
                if (typeof(res.paging.next) == "string") {
                    crawlNext(object_id, res.paging.next, delay)
                };
            } else {
                wlogs.writeMessages("Haven't crwaled from " + object_id + "\n")
                console.log("haven't crwaled from " + object_id)
            };
        })
    };
}