var express = require('express');
var router = express.Router();


/* Return index page */
var sess
router.all('/', function(req, res, next) {
    sess = req.session;
    if (sess.token || sess.email) {
        res.render("index", {
            title: "React automation",
            isAnonymous: false,
            body: "<h1 style='text-align:center'>Hi, Good bye!!! =))</scrip>"
        })
    } else {
        res.render("authentication", {
            title: "React automation",
            isAnonymous: true
        })
    };
});


module.exports = router;