/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var User = Db.extend({
    tableName: "user"
});
exports.User = User;

exports.getUser = function(req, res, rut, pass){
    userVar = new User();
    var where = "rut='" + rut + "' AND pass='" + pass + "'";

    userVar.find('all', {fields: ["id_user", "name"], where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){ //User and pass conbination not found on user db
            var Admin = require('../models/admin');
            Admin.getAdmin(req, res, rut, pass);
        }
        else {//login user
            req.session.userData = {userID: rows[0].id_user, userRut: rut, userName: rows[0].name, admin: 0};
            res.redirect('/user');
        }
    });
};

function createUser(name, rut, pass, email){
    var where = "rut='" + rut + "'";
    var userVar = new User();

    userVar.find('all', {where: where}, function (err, rows) {
        if(err){
            throw err;
        }
        if(rows[0] === undefined){ //This rut does not exist in the users db
            var user = new User({name: name, rut: rut, pass: pass, email: email});
            user.save();
            getAllUsers(req, res);
        }
        else{
            //TODO: show error - rut exists in the db
        }
    });
}
exports.createUser = createUser;

//
//TODO: show if rut already exists, show if successful, show if error
function createAccount(req){
    var common = require("../public/javascript/common");

    var name = req.body.interName;
    var rut = req.body.interRut;
    var pass = req.body.interPass;
    var pass2 = req.body.interPass2;
    var email = req.body.interMail;

    if(common.testAscii(name) && common.validateRut(rut) && common.validatePass(pass) && common.validatePass(pass2) && common.validateMail(email)){
        if(pass == pass2){
            createUser(name, rut, pass, email);
        }
        else{
            //TODO: show error - pass doesn't match
        }
    }
    else{
        //TODO: show error - invalid characters

    }
}
exports.createAccount = createAccount;

function changePass(userID, oldPass, newPass){
    var userVar = new User();

    userVar.query("UPDATE user SET pass='" + newPass + "' WHERE id_user ='" + userID + "' AND pass='" + oldPass + "'", function(err, rows){
        if(err){
            throw err;
        }
        if(rows.changedRows > 0){
            //TODO: message: password change
        }
        else{
            //TODO: message: password not change
        }
    });
    userVar.save();
}
exports.changePass = changePass;

function getAllUsers(req){
    var userVar = new User();

    userVar.find('all', {}, function (err, rows){
        if(err){
            throw err;
        }
        req.session.users = rows;
    });
}
exports.getAllUsers = getAllUsers;

exports.deleteUser = function(id_user){
    var userVar = new User();
    var where = "id_user='" + id_user + "'";
    userVar.remove(where, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.affectedRows == 1){
            //TODO: show user deleted
        }
        else{
            //TODO: show error
        }
    });
    userVar.save()
};
