var fb = require("fb");


//  Using to send  a reaction to object
module.exports.sendReactions = function sendReactions(object_id) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)
        // var delay = delay != undefined ? delay : 5000


    if (typeof(object_id) == "string") {

        fb.api(object_id + "?fields=reactions.limit(100000){id,type}", (res) => {
            if (res.error) {
                wlogs.writeErrors("(16. reactions.js)" + object_id + " - " + res.error.message);
                return;
            }
            // console.log(res)
            if (res.reactions == undefined) {

                doReactions(object_id)

            } else {
                var i = res.reactions.data.length
                do {
                    --i
                    // console.log(res.reactions.data[i])
                    if (res.reactions.data[i].id == config.account.userID) {
                        wlogs.writeMessages("Found " + res.reactions.data[i].id + " reacted " + res.reactions.data[i].type)
                        return
                    };
                } while ((res.reactions.data[i].id !== config.account.userID) && i > 0)

                doReactions(object_id)

            };
        })
    };
}

function doReactions(object_id) {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
        // Do send a type_reactions
    var type_reactions = config.reactions.type_reactions[Math.floor(Math.random() * config.reactions.type_reactions.length)].type
    fb.api(object_id + "/reactions?type=" + type_reactions, "post", (res) => {
            if (res.error) {
                wlogs.writeErrors("(49. reactions.js) ERROR: " + object_id + " - " + res.error.message)
                return;
            }
            if (res.success) {
                wlogs.writeMessages("react success(results): " + object_id + "\t" + res.success + " : " + type_reactions)
            } else {
                wlogs.writeMessages("(53. reactions.js) No data response(data) from " + object_id)
            };
        })
        // End do
}