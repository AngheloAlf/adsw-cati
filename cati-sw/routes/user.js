
//user interface
exports.userInterface = function(req, res){
    if(req.session.userData && !req.session.userData.admin){ //If user is connected
        res.render('userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

//user form handler
exports.processForm = function(req, res){
    if(req.session.userData && !req.session.userData.admin) { //If user is connected
        if(req.body.submitButton == "changePass"){ //Change the pass interviewer
            console.log("la wea weon qlo");
            console.log(req.body.interNewPass);
            console.log(req.body.interNewPass2);
            if(req.body.interNewPass == req.body.interNewPass2){
                console.log("la wea weon qlo");
                var User = require('../models/user.js');
                User.changePass(req.session.userData.userID, req.body.interOldPass, req.body.interNewPass);
            }
        }
        res.redirect('/user');
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

exports.changePassInterface = function(req, res){
    if(req.session.userData && !req.session.userData.admin){ //If user is connected
        res.render('updateUserDashUser', { title: 'CATI - Encuestador - Cambiar contraseña', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
