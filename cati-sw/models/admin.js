/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var Admin = Db.extend({
    tableName: "admin"
});

exports.Admin = Admin;
