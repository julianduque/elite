var express        = require('express'),
    path           = require('path'),
    favicon        = require('static-favicon'),
    logger         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    bodyParser     = require('body-parser'),
    hbs            = require('express-handlebars'),
    passport       = require('passport'),
    routes         = require('./routes/'),
    app            = express();

// view engine setup
app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'n0ts3cur3!', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.home);
app.use('/auth', routes.auth);
app.use('/invites', routes.invites);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
