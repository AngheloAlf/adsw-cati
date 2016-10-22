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

exports.Admin = Admin;
exports.getAdmin = getAdmin;
