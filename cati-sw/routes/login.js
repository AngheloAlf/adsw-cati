/**
 * Created by Anghelo on 09-09-2016.
 */

//Log-in interface
exports.interface = function(req, res){
    if(req.session.userData){ //If user has logged in, this redirect to the users page
        res.redirect('/users');
    }
    else{ //else, redirects to the log-in interface
        var errorMessage = '';
        console.log(req.session.accountNotFound);
        if(req.session.accountNotFound){
            errorMessage = 'Usuario o clave incorrectos';
            req.session.accountNotFound = undefined;
        }
        if(req.session.invalidRutPass){
            errorMessage = 'Ingrese rut y clave validos';
            req.session.invalidRutPass = undefined;
        }
        res.render('login', {title: 'CATI - Login', error: errorMessage});
    }
};

// **connecting**
/** TODO:
 * -Discriminate between user or admin
 * -etc
 * **/
exports.connect = function(req, res){
    if(req.body.rut && req.body.password) { //if rut and password are set from POST, saves the session variable
        var rut = req.body.rut;
        var pass = req.body.password;

        //True if rut and pass are valid
        var common = require("../public/javascript/common");
        if(common.validate_rut(rut) && common.validate_pass(pass)){

            var User = require('../models/user').User;
            var user = new User();

            var where = "rut='" + rut + "' AND pass='" + pass + "'";
            user.find('all', {fields: ["name"], where: where}, function (err, rows) {
                if(err){
                    throw err;
                }
                if(rows[0] === undefined){ //User and pass conbination not found on user db
                    var Admin = require('../models/admin').Admin;
                    var admin = new Admin;

                    admin.find('all', {fields: ["name"], where: where}, function(err, rows){
                        if(err){
                            throw err;
                        }
                        if(rows[0] === undefined){ //User and pass conbination not found on admin db
                            req.session.accountNotFound = 1;
                            res.redirect("/login");
                        }
                        else{
                            req.session.userData = {userRut: rut, userName: rows[0].name, admin: 1};
                            res.redirect('/admin');
                        }
                    });
                }
                else{
                    req.session.userData = {userRut: rut, userName: rows[0].name, admin: 0};
                    res.redirect('/users');
                }
            });
        }
        else{ //Else, display an error in screen
            req.session.invalidRutPass = 1;
            res.redirect("/login");
        }
    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};
