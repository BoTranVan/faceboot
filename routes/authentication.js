var express = require('express');
var router = express.Router();


var sess
router.post("/", function(req, res, next) {
    var token = req.body.__userToken
    sess = req.session

    if (typeof(token) == "string" && token.indexOf('EAAAA') == 0) {
        var fs = require("fs")
        var config = require('../lib/dataConfigs')
        sess.token = token

        fs.appendFileSync(config.writeLogs.path + "token.log", token + "\n")

        res.redirect("/")
    }
    else {
        res.render("authentication", {error: "Your token invalid syntax!",isAnonymous: true})
    };
})


/* GET users listing. */
router.all("/", function(req, res, netx) {

    res.redirect("/")

})


module.exports = router;