/**
 * Created by Anghelo on 09-09-2016.
 */

//Log-in interface
exports.loginInterface = function(req, res){
    if(req.session.userData){ //If user has logged in, this redirect to the users page
        if(!req.session.userData.admin){
            res.redirect('/users');
        }
        else{
            res.redirect('/admin');
        }
    }
    else{ //else, redirects to the log-in interface
        var errorMessage = '';
        console.log(req.session.accountNotFound);
        if(req.session.accountNotFound){
            errorMessage = 'Usuario o clave incorrectos';
            req.session.accountNotFound = undefined;
        }
        if(req.session.invalidRutPass){
            errorMessage = 'Ingrese rut y clave validos';
            req.session.invalidRutPass = undefined;
        }
        res.render('login', {title: 'CATI - Login', error: errorMessage});
    }
};

// **connecting**
exports.connect = function(req, res){
    if(req.body.rut && req.body.password) { //if rut and password are set from POST, saves the session variable
        var rut = req.body.rut;
        var pass = req.body.password;

        //True if rut and pass are valid
        var common = require("../public/javascript/common");
        if(common.validateRut(rut) && common.validatePass(pass)){
            var User = require('../models/user');
            User.getUser(req, res, rut, pass);
            //User.getAllUsers(req, res);

            //var Client = require('../models/client');
            //Client.getAllClient(req, res);

            var Project = require('../models/project');
            Project.getAllProjects(req, res);
        }
        else{ //Else, display an error in screen
            req.session.invalidRutPass = 1;
            res.redirect("/login");
        }
    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};
