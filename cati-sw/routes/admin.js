/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../routes/index');

//admin interface
exports.adminInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
    });
};

exports.createProjectInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('createProject', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName});
    });
};

exports.createUserInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('createUser', { title: 'CATI - Admin - Crear Encuestador', nombre: req.session.userData.userName});
    });
};

exports.uploadCSVInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('uploadCSV', { title: 'CATI - Admin - Subir contactos', nombre: req.session.userData.userName});
    })
};

exports.readUsersInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('readUsers', { title: 'CATI - Admin - Ver encuestadores', nombre: req.session.userData.userName});
    })
};

exports.userStadisticsInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('userStadistics', { title: 'CATI - Admin - Estadisticas', nombre: req.session.userData.userName});
    })
};

exports.readProjectInterface = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.render('readProject', { title: 'CATI - Admin - Ver proyecto', nombre: req.session.userData.userName});
    })
};

//admin form handler
exports.processForm = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        var redirectToAdmin = true;

        var User = require('../models/user.js');
        var Admin = require('../models/admin.js');
        var Project = require('../models/project.js');
        var Contact = require('../models/contact.js');
        var parse = require('csv-parse/lib/sync');

        if(req.body.submitButton == "createInter"){ //Create interviewer
            User.createAccount(req, res);
        }
        else if(req.body.submitButton == "createProject"){
            Project.createNewProject(req);
        }
        else if(req.body.submitButton == "deleteInter"){
            Admin.deleteUser(req.body.readUser, req.session.userData.userID, req.body.userDeletePass);
        }
        else if(req.body.submitButton == "uploadCSV"){
            var projectCsv = req.files.uploadContacts;
            var csvParsed = parse(projectCsv.data.toString());

            for(var i = 1; i < csvParsed.length; i++){
                Contact.createContact(csvParsed[i][0], csvParsed[i][1], csvParsed[i][2], csvParsed[i][3], req.body.uploadProject);
            }
        }
        else if(req.body.submitButton == "stadisticsInter"){
            redirectToAdmin = false;
            res.redirect("/admin/verEncuestador/" + req.body.readUser);
        }
        else if(req.body.submitButton == "deleteProject"){
            Admin.deleteProject(req.body.readProject, req.session.userData.userID, req.body.projectDeletePass);
        }

        if(redirectToAdmin){
            res.redirect('/admin');
        }
    });
};
