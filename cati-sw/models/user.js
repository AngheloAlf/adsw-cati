/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var User = Db.extend({
    tableName: "user"
});

function getUser(req, res, rut, pass){
    userVar = new User();
    var where = "rut='" + rut + "' AND pass='" + pass + "'";

    userVar.find('all', {fields: ["name"], where: where}, function (err, rows) {
        if (err) {
            throw err;
        }
        if (rows[0] === undefined) { //User and pass conbination not found on user db
            var Admin = require('../models/admin');
            Admin.getAdmin(req, res, rut, pass);
        }
        else {//login user
            req.session.userData = {userRut: rut, userName: rows[0].name, admin: 0};
            res.redirect('/users');
        }
    });
}

exports.User = User;
exports.getUser = getUser;
