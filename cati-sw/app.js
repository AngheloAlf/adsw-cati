/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var login = require('./routes/login');
var admin = require('./routes/admin');

var http = require('http');
var path = require('path');

var app = express();


var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

// must use cookieParser before expressSession
app.use(cookieParser());

/** TODO: change the 'secret' **/
app.use(expressSession({secret:'somesecrettokenhere'}));

app.use(bodyParser());

/* testeo session */
/*
app.get('/sessionTest', function(req, res){
    var html = '<form action="" method="post">' +
        'Your name: <input type="text" name="userName"><br>' +
        '<button type="submit">Submit</button>' +
        '</form>';
    if (req.session.userName) {
        html += '<br>Your username from your session is: ' + req.session.userName;
    }
    res.send(html);
});

app.post('/sessionTest', function(req, res){
    req.session.userName = req.body.userName;
    res.redirect('/sessionTest');
});
*/
//fin testeo



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.favicon(path.join(__dirname, 'public','static','favicon.ico')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', index.index);
app.post('/', index.log_out);

app.get('/login', login.interface);
app.post('/login', login.connect);

app.get('/users', user.interface);

app.get('/admin', admin.interface);

// 404 error handler
app.use(function(req, res){
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404', { title: 'CATI - 404 ERROR' });
});

app.use(express.static('public'));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    console.log('¡Servidor CATI iniciado!');
});
