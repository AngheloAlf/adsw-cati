
var index = require('../routes/index');

//user interface
exports.userInterface = function(req, res){
    /*if(req.session.userData && !req.session.userData.admin){ //If user is connected
        res.render('userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
    //index.verificateLogin(req, res, false, 'userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });

    index.verificateLogin(req, res, false, function(req, res){
        res.render('userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });
    });

};

exports.changePassInterface = function(req, res){
    /*if(req.session.userData && !req.session.userData.admin){ //If user is connected
     res.render('updateUserDashUser', { title: 'CATI - Encuestador - Cambiar contraseña', nombre: req.session.userData.userName });
     }
     else{//else, redirects to the login interface
     res.redirect('/login');
     }*/
    //index.verificateLogin(req, res, false, 'updateUserDashUser', { title: 'CATI - Encuestador - Cambiar contraseña', nombre: req.session.userData.userName });
    index.verificateLogin(req, res, false, function(req, res){
        res.render('updateUserDashUser', { title: 'CATI - Encuestador - Cambiar contraseña', nombre: req.session.userData.userName });
    });
};

//user form handler
exports.processForm = function(req, res){
    /*if(req.session.userData && !req.session.userData.admin) { //If user is connected
        if(req.body.submitButton == "changePass"){ //Change the pass interviewer
            if(req.body.interNewPass == req.body.interNewPass2){
                var User = require('../models/user.js');
                User.changePass(req.session.userData.userID, req.body.interOldPass, req.body.interNewPass);
            }
        }
        res.redirect('/user');
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }*/
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
