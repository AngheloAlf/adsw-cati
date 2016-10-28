/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../routes/index');

//users interface
function adminInterface(req, res){
    /*if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    index.verificateLogin(req, res, true, 'adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
}
exports.adminInterface = adminInterface;


exports.createProyectInterface = function(req, res){
    /*if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createProyectDashAdmin', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName, clientsList: req.session.clients});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    index.verificateLogin(req, res, true, 'createProyectDashAdmin', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName, clientsList: req.session.clients});
};

exports.createUserInterface = function(req, res){
    /*if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createUserDashAdmin', { title: 'CATI - Admin - Crear Encuestador', nombre: req.session.userData.userName});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    index.verificateLogin(req, res, true, 'createUserDashAdmin', { title: 'CATI - Admin - Crear Encuestador', nombre: req.session.userData.userName});
};

exports.deleteUserInterface = function(req, res){
    /*if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('deleteUser', { title: 'CATI - Admin - Eliminar Encuestador', nombre: req.session.userData.userName, userList: req.session.users});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    index.verificateLogin(req, res, true, 'deleteUser', { title: 'CATI - Admin - Eliminar Encuestador', nombre: req.session.userData.userName, userList: req.session.users});
};

exports.uploadCSVInterface = function(req, res){
    /*if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('uploadCSV', { title: 'CATI - Admin - Subir contactos', nombre: req.session.userData.userName, projectList: req.session.AllProjects});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    index.verificateLogin(req, res, true, 'uploadCSV', { title: 'CATI - Admin - Subir contactos', nombre: req.session.userData.userName, projectList: req.session.AllProjects});
};

exports.readUsersInterface = function(req, res){
    index.verificateLogin(req, res, true, 'readUsers', { title: 'CATI - Admin - Ver encuestadores', nombre: req.session.userData.userName, usersList: req.session.users});
};
/*
exports.showUserInterface = function(req, res){
    res.send(req.params.idUser);
}*/

//admin form handler
exports.processForm = function (req, res){
    if(req.session.userData && req.session.userData.admin) { //If admin is connected
        var redirectToAdmin = true;

        var User = require('../models/user.js');
        var Project = require('../models/project.js');
        var Contact = require('../models/contact.js');
        var parse = require('csv-parse/lib/sync');

        if(req.body.submitButton == "createInter"){ //Create interviewer
            User.createAccount(req, res);
        }
        else if(req.body.submitButton == "createProyect"){
            Project.createNewProject(req, res);
        }

        else if(req.body.submitButton == "deleteInter"){
            User.deleteUser(req.body.deleteUser);
        }
        else if(req.body.submitButton == "uploadCSV"){
             var proyectCsv = req.files.uploadContacts;
             var csvParsed = parse(proyectCsv.data.toString());

             for(var i = 1; i < csvParsed.length; i++){
                Contact.createContact(csvParsed[i][0], csvParsed[i][1], csvParsed[i][2], csvParsed[i][3], req.body.uploadProject);
             }
        }
        /*else if(req.body.submitButton == "readInter"){
            redirectToAdmin = false;
            res.redirect('/admin/verEncuestador/'+req.body.readUser);
        }*/

        if(redirectToAdmin){
            res.redirect('/admin');
        }
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
