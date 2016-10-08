/**
 * Created by Anghelo on 10-09-2016.
 */

//users interface
function adminInterface(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
}

//
//TODO: show if rut already exists, show if successful, show if error
function createAccount(req, res){
    var common = require("../public/javascript/common");

    var name = req.body.interName;
    var rut = req.body.interRut;
    var pass = req.body.interPass;
    var pass2 = req.body.interPass2;
    var email = req.body.interMail;

    if(common.testAscii(name) && common.validateRut(rut) && common.validatePass(pass) && common.validatePass(pass2) && common.validateMail(email)){
        if(pass == pass2){
            var User = require('../models/user');

            User.createUser(name, rut, pass, email);
        }
        else{
            //TODO: show error - pass doesn't match

        }
    }
    else{
        //TODO: show error - invalid characters

    }
}


//admin form handler
exports.processForm = function (req, res){

    if(req.session.userData && req.session.userData.admin) { //If admin is connected
        if (req.body.submitButton == "createInter") { //Create interviewer
            createAccount(req, res);
        }

        //render the admin dash
        adminInterface(req, res);
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};


exports.adminInterface = adminInterface;

exports.createProyectInterface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createProyectDash', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName, clientsList: req.session.clients});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
