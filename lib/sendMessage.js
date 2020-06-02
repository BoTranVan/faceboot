var login = require("facebook-chat-api");

// Using to send threads


module.exports.sendMessage = function sendMessage(userID, delay) {
    var config = require("./dataConfigs");
    var wlogs = require("./writeLogs.js");
    var delay = delay || require("./delay").getDelay()
        // console.log(userID + " - " + delay)
    var message = config.sendMessage.contentMessages[Math.floor(Math.random() * config.sendMessage.contentMessages.length)].content
    login(config.account, (err, api) => {
        if (err) return console.error(err);
        if (typeof(userID) == "object") {
            for (var i = userID.data.length; i--;) {
                var message = config.sendMessage.contentMessages[Math.floor(Math.random() * config.sendMessage.contentMessages.length)].content
                    // console.log(userID.data[i].id);
                setTimeout(function() {
                    message(api, userID.data[i].id, message, wlogs)
                }, delay)
            }
        }
        if (typeof(userID) == "string") {
            // console.log(userID)
            message(api, userID, message, wlogs)
        }
    })

}


function message(api, userID, message, wlogs) {
    api.sendMessage(message, userID, (err, messageInfo) => {
        err ? wlogs.writeErrors("ERROR" + err) : wlogs.writeMessages("Sent  " + messageInfo.messageID);
    });
}