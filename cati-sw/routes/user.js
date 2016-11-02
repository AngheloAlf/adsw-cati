
var index = require('../routes/index');

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

//user form handler
exports.processForm = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        if(req.body.submitButton == "changePass"){ //Change the pass interviewer
            if(req.body.interNewPass == req.body.interNewPass2){
                var User = require('../models/user.js');
                User.changePass(req.session.userData.userID, req.body.interOldPass, req.body.interNewPass);
            }
        }
        res.redirect('/user');
    });
};
