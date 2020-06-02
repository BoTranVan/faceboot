var fb = require("fb");


//  Using to get informations about friends
function getInfoFriends() {
    var config = require("./dataConfigs")
    var wlogs = require("./writeLogs")
    var gender = config.getInfoFriends.gender
    var pathfile = config.getInfoFriends.saveTo
    fb.options(config.account.version)
    fb.setAccessToken(config.account.access_token)

    fb.api("me/friends?fields=gender,id,name,username,link&limit=5000", (res) => {
        if (res.error) {
            wlogs.writeErrors("(15. getInfoFriends.js)" + res.error)
        };
        wlogs.writeResponseGetFriendsList(res.data, gender, pathfile)
    })

}

module.exports = {
    getInfoFriends: getInfoFriends
}