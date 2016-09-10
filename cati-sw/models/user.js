/**
 * Created by Anghelo on 10-09-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var User = Db.extend({
    tableName: "user"
});

exports.User = User;
