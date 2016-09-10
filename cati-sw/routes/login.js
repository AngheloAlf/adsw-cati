/**
 * Created by Anghelo on 09-09-2016.
 */

//Log-in interface
exports.interface = function(req, res){
    if(req.session.userRut){ //If user has logged in, this redirect to the users page
        res.redirect('/users');
    }
    else{ //else, redirects to the log-in interface
        var errorMessage = '';
        console.log(req.session.accountNotFound);
        if(req.session.accountNotFound){
            errorMessage = 'Usuario o clave incorrectos';
            req.session.accountNotFound = undefined;
            console.log("console.log");
        }
        res.render('login', {title: 'CATI - Login', error: errorMessage});
    }
};

// **connecting**
/** TODO:
 * -regex
 * -Discriminate between user or admin
 * -etc
 * **/
exports.connect = function(req, res){
    if(req.body.rut && req.body.password){ //if rut and password are set from POST, saves the session variable

        //TODO: validate inputs
        var rut = req.body.rut;
        var pass = req.body.password;

        var User = require('../models/user').User;
        var user = new User();

        user.find('all', {fields: ["name"], where: "rut='"+rut+"' AND pass='"+pass+"'"}, function(err, rows){
            if(err){
                throw err;
            }
            if(rows[0] === undefined){
                req.session.accountNotFound = 1;
            }
            else{
                req.session.userRut = rut;
                req.session.name = rows[0].name;
            }
            res.redirect('/users');
        });
    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};

