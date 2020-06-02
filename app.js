var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Set session
app.use(cookieSession({
    name: 'session',
    keys: ['ministry', 'tran'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// Define routing
app.use('/', require('./routes/index'));
app.use('/logout', require('./routes/logout'));
app.use('/login', require('./routes/login'));
app.use('/authentication', require('./routes/authentication'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error'); // for debug
    // res.redirect('/');
});


// //  Content of my app using facebook api
// var init = require("./lib/init.js")
// var env_run = init.runLoop(init.runInit)

//  End of content my app using facebook api

module.exports = app;
