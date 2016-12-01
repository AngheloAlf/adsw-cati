
var index = require('../routes/index');
var path = require("path");
var fs = require("fs");

//user interface
exports.userInterface = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        res.render('userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });
    });

};

exports.changePassInterface = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        res.render('updateUser', { title: 'CATI - Encuestador - Cambiar contraseña', nombre: req.session.userData.userName });
    });
};

exports.callInterface = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        res.render('call', { title: 'CATI - Encuestador - Llamar', nombre: req.session.userData.userName });
    });
};

//user form handler
exports.processForm = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        var User = require('../models/user.js');
        var Contact = require('../models/contact.js');

        if(req.body.submitButton == "changePass"){ //Change the pass interviewer
            if(req.body.interNewPass == req.body.interNewPass2){
                User.changePass(req.session.userData.userID, req.body.interOldPass, req.body.interNewPass);
            }
        }
        else if(req.body.submitButton == "updateContactState"){ //Update contact state
            Contact.updateState(req.body.numberCall, req.body.newState);
        }
        else if(req.body.submitButton == "uploadRecording"){
            var uploadRecord = req.files.uploadRecord;
            uploadRecord.mv(path.resolve(".", "public", "audioRecords", "project" + req.body.uploadProject, uploadRecord.name), function(err){
                if(err){
                    fs.mkdirSync(path.resolve(".", "public", "audioRecords", "project" + req.body.uploadProject));
                    //res.status(500).send(err);
                    uploadRecord.mv(path.resolve(".", "public", "audioRecords", "project" + req.body.uploadProject, uploadRecord.name), function(err){
                        if(err){
                            //res.status(500).send(err);
                        }
                        else{
                            //file uploaded succecfully
                        }
                    });
                }
                else{
                    //file uploaded succecfully
                }
            });
        }

        res.redirect('/user');
    });
};
