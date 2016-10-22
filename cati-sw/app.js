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
var fileUpload = require('express-fileupload'); // To handle files uploads
//var csv = require('csv'); //CSV generation, parsing, transformation and serialization


// must use cookieParser before expressSession
app.use(cookieParser());

/** TODO: change the 'secret' **/
app.use(expressSession({secret:'somesecrettokenhere'}));

app.use(bodyParser());

app.use(fileUpload());

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

app.get('/login', login.loginInterface);
app.post('/login', login.connect);

app.get('/users', user.userInterface);

app.get('/admin', admin.adminInterface);
app.post('/admin', admin.processForm);

app.get('/admin/crearProyecto', admin.createProyectInterface);
app.post('/admin/crearProyecto', admin.processForm);

app.get('/admin/crearEncuestador', admin.createUserInterface);
app.post('/admin/crearEncuestador', admin.processForm);

app.get('/user/modificarDatos', user.changePassInterface);
app.post('/user/modificarDatos', user.processForm);

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
