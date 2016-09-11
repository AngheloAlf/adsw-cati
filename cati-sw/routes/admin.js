/**
 * Created by Anghelo on 10-09-2016.
 */

//users interface
/** TODO:
 *  -make a jade page for admin
 *  -etc
 * **/
exports.interface = function(req, res){
    if(req.session.userData && req.session.userData.admin){ //If admin is connected
        res.render('adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

//TODO: regex, validate rut, show if rut already exists, show if successful,
exports.processForm = function (req, res){
    if(req.session.userData && req.session.userData.admin) { //If admin is connected
        if (req.body.submitButton == "createInter") { //Create interviewer

            var name = req.body.interName;
            var rut = req.body.interRut;
            var pass = req.body.interPass;
            var pass2 = req.body.interPass2;
            var email = req.body.interMail;

            if (pass == pass2) {
                var User = require('../models/user').User;
                (new User).find('all', {where: "rut='" + rut + "'"}, function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    if (rows[0] === undefined) { //This rut does not exist in the users db
                        var user = new User({name: name, rut: rut, pass: pass, email: email});
                        user.save();
                    }
                });
            }
            res.render('adminDash', {title: 'CATI - Administrador', nombre: req.session.userData.userName});
        }
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

