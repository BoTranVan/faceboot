var fs = require("fs");
var timeStamp = new Date()


//  Using write logs when application running
function writeMessages(data) {
    var config = require("./dataConfigs")
    var dir = config.writeLogs.path
    fs.appendFileSync(dir + "messages.log", timeStamp + "\t\t" + data + "\n")
}

function writeErrors(data) {
    var config = require("./dataConfigs")
    var dir = config.writeLogs.path
    fs.appendFileSync(dir + "error.log", timeStamp + "\t ERROR: \t" + data + "\n");
}

function writeResponseGetFriendsList(data, gender, pathfile) {
    if (typeof(data) == "object" && typeof(pathfile) == "string" && typeof(gender) == "string") {
        fs.writeFileSync("./" + pathfile, "module.exports = { data: [ ")
        if (gender != "") {
            //  Write data using base gender
            writeMessages("(23. writeLogs.js) Getting data about friends " + gender)
            for (var i = data.length - 1; i >= 0; i--) {
                // console.log(data[i])
                var content = JSON.stringify(data[i])
                if (data[i].id != 0 && i > 0 && data[i].gender == gender) {
                    fs.appendFileSync(pathfile, content + ",")
                } else if (data[i].id != 0 && i == 0 && data[i].gender == gender) {
                    fs.appendFileSync(pathfile, content + "]}")
                    return
                } else if (i == 0) {
                    fs.appendFileSync(pathfile, "]}")
                }
            }
        } else {
            writeMessages("(37. writeLogs.js) Getting data about all friends")
            for (var i = data.length - 1; i >= 0; i--) {
                var content = JSON.stringify(data[i])
                    // console.log(data[i])
                if (data[i].id != 0 && i > 0) {
                    fs.appendFileSync(pathfile, content + ",")
                } else if (data[i].id != 0 && i == 0) {
                    fs.appendFileSync(pathfile, content + "]}")
                }
            }
        }
    }
}

module.exports = {
    writeMessages: writeMessages,
    writeErrors: writeErrors,
    writeResponseGetFriendsList: writeResponseGetFriendsList
}