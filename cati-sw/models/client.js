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

exports.getAllClient = function(req){
    var clientVar = new Client();

    clientVar.find('all', {}, function (err, rows){
        if(err){
            throw err;
        }
        req.session.clients = rows;
    });
};

exports.sendClientById = function(req, res, id_client){
    clientVar = new Client();
    var where = "id_client='" + id_client + "'";

    clientVar.find('all', {fields: ["id_client", "name", "email"], where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){
            // Show not found
        }
        else {//login user
            res.send('{"clientData": [{"id_client": "' + rows[0].id_client + '", "name": "' + rows[0].name + '", "email": "' + rows[0].email + '"}]}');
        }
    });
};

exports.sendAllClients = function(req, res){
    clientVar = new Client();
    clientVar.find('all', {fields: ["id_client", "name", "email"]}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){
            // Show not found
        }
        else {//login user
            var response = '{"clientsData": [';
            for(var i = 0; i < rows.length; i++){
                if(i>0){
                    response += ', ';
                }
                response += '{"id_client": "' + rows[i].id_client + '", "name": "' + rows[i].name + '", "email": "' + rows[i].email + '"}';
            }
            response += ']}';
            res.send(response);
        }
    });
};
