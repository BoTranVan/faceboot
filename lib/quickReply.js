var login = require("facebook-chat-api")

// Simple bot listen all threads and reply whaterver have a coming thread

module.exports.quickReply = function quickReply() {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")

    //  Login to your account.
    login(config.account, (err, api) => {
        if (err) return console.error(err);

        //  Create a connection listen message coming
        api.listen((err, message) => {
            if (err) {
                wlogs.writeErrors(JSON.stringify(err))
            }

            //  Send quick reply
            var content = config.quickReply[Math.floor(Math.random() * config.quickReply.length)].content.message
            api.sendMessage(content, message.threadID, (err, messageInfo) => {
                err ? wlogs.writeErrors("(20. quickReply.js) ERROR: " + JSON.stringify(err)) : wlogs.writeMessages("Sent  " + messageInfo.timestamp + " and messageID: " + messageInfo.messageID);
            })
        })
    })
}