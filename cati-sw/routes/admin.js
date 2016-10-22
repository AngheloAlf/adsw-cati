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
exports.adminInterface = adminInterface;


//admin form handler
exports.processForm = function (req, res){

    if(req.session.userData && req.session.userData.admin) { //If admin is connected
        var User = require('../models/user.js');
        var Project = require('../models/project.js');

        if(req.body.submitButton == "createInter"){ //Create interviewer
            User.createAccount(req, res);
        }
        else if(req.body.submitButton == "createProyect"){
            Project.createNewProject(res, req);

            /*
            var Contact = require('../models/contact.js');

            var parse = require('csv-parse/lib/sync');

            var proyectCsv = req.files.proyectCsv;
            var csvParsed = parse(proyectCsv.data.toString());

            for(var i = 0; i < csvParsed.length; i++){
                Contact.createContact(csvParsed[i][0], csvParsed[i][1], csvParsed[i][2], csvParsed[i][3], projectId);
            }*/
        }

        else if(req.body.submitButton == "deleteInter"){
            User.deleteUser(req.body.deleteUser);
        }

        //render the admin dash
        //adminInterface(req, res);
        res.redirect('/admin');
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

exports.createProyectInterface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createProyectDashAdmin', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName, clientsList: req.session.clients});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

exports.createUserInterface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createUserDashAdmin', { title: 'CATI - Admin - Crear Encuestador', nombre: req.session.userData.userName});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

exports.deleteUserInterface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        console.log("la wea weon qlo");
        console.log( req.session.users);
        res.render('deleteUser', { title: 'CATI - Admin - Eliminar Encuestador', nombre: req.session.userData.userName, userList: req.session.users});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
