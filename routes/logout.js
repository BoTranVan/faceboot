var express = require('express');
var router = express.Router();


router.all("/", function(req, res, next) {
    // body...
    req.session = null

    res.redirect("back")
})


module.exports = router;