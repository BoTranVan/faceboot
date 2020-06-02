// Using to define config using by modules
// filename : {config: value}


var mes = require("./sendMessage")
var gif = require("./getInfoFriends")
var qr = require("./quickReply")

module.exports = {
    account: {
        email: "@yahoo.com",
        password: "",
        access_token: "EAAAAUaZA8jlABAPLWzrlLeV6U2x9FwWA9qj5s8L2Cw1NZAyBEoUZBSZA4kxOPCRlEuEMmUZCwtvIZB4fkDMkH8MHtqzjn9ZAm3XESGngVTXCvmEZBdV8VvpTsZAVNpryMHnA8ZCJgyxEZAZC0eH20ul4I2PyBXNM5WyQ3dsZD",
        version: "v2.12",
        userID: "100005848950426"
    },
    getInfoFriends: {
        gender: "female",
        saveTo: "./dataFriends.js"
    },
    post: {
        postStatus: [{
            // id: 1,
            // content: {
            //     message: " Hihi ❤ "
            // }
        }],
        postComment: [{
            id: 1,
            content: {
                message: " Hihi ❤ "
            }
        }],
        timeStamp: "2018-01-01T00:00:00"
    },
    quickReply: [{
        id: 1,
        content: {
            message: "Hi, mình là Lucky! :* \nMay mắn sẽ đến với bạn khi bạn nhắn tin tới mình❤\nMình sẽ trả lời bạn ngay sau ít phút! Hihi...\nBạn hãy chờ mình nha :* \n "
        }
    }],
    reactions: {
        type_reactions: [{
            // {
            //     id: 0,
            //     type: "NONE"
            // }
            //     id: 1,
            // /     type: "LIKE"
            // }, {
            id: 2,
            type: "LOVE"
                // }, {
                //     id: 3,
                //     type: "WOW"
                // }, {
                //     id: 4,
                //     type: "HAHA"
                // }, {
                //     id: 5,
                //     type: "SAD"
                // }, {
                //     id: 6,
                //     type: "ANGRY"
                // }, {
                //     id: 7,
                //     type: "THANKFUL"
        }],
    },
    sendMessage: {
        gender: "female",
        contentMessages: [{
            id: 1,
            content: "(¯`*•.¸,¤°´’`°¤,¸.•*´¯)\n¸,¤°´’`°•.¸8¸.•°´’`°¤,¸\nNhân ngày mùng tám tháng ba\nChúc c gặp nhiều niềm vui và hạnh phúc mỗi ngày \n*´’`°¤¸¸.•’´3`’•.¸¸¤°´’`*\n(_¸.•*´’`°¤¸’¸¤°´’`*•.¸_)"
        }]
    },
    writeLogs: {
        path: "logs/"
    }
}
