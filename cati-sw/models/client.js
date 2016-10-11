/**
 * Created by Anghelo on 08-10-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var Client = Db.extend({
    tableName: "client"
});

exports.createClient = function(name, email){
    var where = "name='" + name + "'";
    var clientVar = new Client();

    clientVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){ //This client does not exist in the clients db
            var client = new Client({name: name, email: email});
            client.save();
        }
        else{
            //TODO: show error - rut exists in the db
        }
    });
};

exports.getAllClient = function(req, res){
    var clientVar = new Client();

    clientVar.find('all', {}, function (err, rows){
        if(err){
            throw err;
        }
        req.session.clients = rows;
    });
};
