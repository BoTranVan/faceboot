// Using define methods using
var post = require("./post")
var react = require("./reactions")
var wlogs = require("./writeLogs")

module.exports.run = function run(object_id, delay) {
    if (typeof(object_id) == "string") {
        setTimeout(function() {
            post.postComment(object_id)
            react.sendReactions(object_id)
        }, delay)
    } else {

        wlogs.writeErrors("Can't do something with " + object_id)
    };
};