/**
 * Created by Anghelo on 10-09-2016.
 */

var mysqlModel = require('mysql-model');

var CatiDB = mysqlModel.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'cati',
    dateStrings: 'date'
});

exports.Db = CatiDB;
