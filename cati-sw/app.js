/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var login = require('./routes/login');
var admin = require('./routes/admin');
var angularCtrl = require('./routes/angularCtrl');

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

app.get('/user', user.userInterface);
app.post('/user', user.processForm);

app.get('/user/modificarDatos', user.changePassInterface);

app.get('/user/call', user.callInterface);

app.get('/admin', admin.adminInterface);
app.post('/admin', admin.processForm);

app.get('/admin/crearProyecto', admin.createProjectInterface);

app.get('/admin/crearEncuestador', admin.createUserInterface);

app.get('/admin/subirCSV', admin.uploadCSVInterface);

app.get('/admin/verEncuestador', admin.readUsersInterface);
app.get('/admin/verEncuestador/:idUser', admin.userStadisticsInterface);

app.get('/admin/verProyecto', admin.readProjectInterface);

app.get('/admin/agregarCliente', admin.createClientInterface);

//app.get('/admin/descargarGrabaciones', admin.donwloadRecordsInterface);


app.get('/angular/user', angularCtrl.getUsers);
app.get('/angular/user/:idUser', angularCtrl.getUserData);

app.get('/angular/client',  angularCtrl.getClients);
app.get('/angular/client/:idClient',  angularCtrl.getClientData);

app.get('/angular/project',  angularCtrl.getProjects);
app.get('/angular/project/:idProject',  angularCtrl.getProjectData);

app.get('/angular/contact', angularCtrl.getContacts);
app.get('/angular/contact/:idContact', angularCtrl.getContactsData);

app.get('/angular/records/:idProject', angularCtrl.getRecordsData);
app.get('/angular/records/:idProject/:fileName', angularCtrl.downloadFile);

//req.body.id == $_POST["id"]
//req.query.id == $_GET["id"]

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
