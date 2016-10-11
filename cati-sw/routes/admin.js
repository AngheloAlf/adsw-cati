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
        if(req.body.submitButton == "createInter"){ //Create interviewer
            var User = require('../models/user.js');
            User.createAccount(req, res);
        }
        else if(req.body.submitButton == "createProyect"){
            var proyectCsv = req.files.proyectCsv;
            console.log(proyectCsv.data.toString());
            //TODO: Parse csv file and add it to the contacts table, then add the proyect to the db
        }

        //render the admin dash
        adminInterface(req, res);
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

exports.createProyectInterface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('createProyectDash', { title: 'CATI - Admin - Crear Proyecto', nombre: req.session.userData.userName, clientsList: req.session.clients});
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
