/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var Admin = Db.extend({
    tableName: "admin"
});


function getAdmin(req, res, rut, pass){
    var admin = new Admin;
    var where = "rut='" + rut + "' AND pass='" + pass + "'";

    admin.find('all', {fields: ["id_admin", "name"], where: where}, function (err, rows) {
        if(err){
            throw err;
        }
        if(rows[0] === undefined){ //User and pass conbination not found on admin db
            req.session.accountNotFound = 1;
            res.redirect("/login");
        }
        else{//login admin
            req.session.userData = {userID: rows[0].id_admin, userRut: rut, userName: rows[0].name, admin: 1};
            res.redirect('/admin');
        }
    });
}

exports.deleteUser = function(userId, adminId, adminPass){
    var adminvar = new Admin;
    var where = "id_admin='" + adminId + "' AND pass='" + adminPass + "'";

    adminvar.find('all', {where: where}, function(err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){ //Bad password
            //req.session.accountNotFound = 1;
            //res.redirect("/login");
        }
        else{//login admin
            //req.session.userData = {userID: rows[0].id_admin, userRut: rut, userName: rows[0].name, admin: 1};
            //res.redirect('/admin');
            var User = require("../models/user");
            User.deleteUser(userId);
        }
    });
};

exports.deleteProject = function(projectId, adminId, adminPass){
    var adminVar = new Admin;
    var where = "id_admin='" + adminId + "' AND pass='" + adminPass + "'";

    adminVar.find('all', {where: where}, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.length == 1){ //Good password
            var Project = require("../models/project");
            Project.hideProject(projectId);
        }
        else{ //Bad password
            //TODO: show error
        }
    });


};

exports.Admin = Admin;
exports.getAdmin = getAdmin;
