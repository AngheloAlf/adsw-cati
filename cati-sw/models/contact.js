/**
 * Created by Anghelo on 13-10-2016.
 */

var index = require('../models/index');
var Db = index.Db;

var Contact = Db.extend({
    tableName: "contact"
});

exports.createContact = function(firstName, lastName, number, state, idProject){
    var contactVar = new Contact({first_name: firstName, last_name: lastName, number: number, state: state, id_project: idProject});
    contactVar.save();
};

exports.getAllContact = function(req){
    var contactVar = new Contact();

    contactVar.find('all', {}, function (err, rows){
        if(err){
            throw err;
        }
        req.session.contacts = rows;
    });
};


exports.sendAllContacts = function(req, res){
    var contactVar = new Contact();
    var where = "";

    contactVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows.length != 0){// found
            var response = '{"contactsData": ' + JSON.stringify(rows) + '}';
            res.send(response);
        }
        else { // not found
            res.redirect("/login");
        }
    });
};

exports.sendContactById = function(req, res, id_contact){
    var contactVar = new Contact();
    var where = "id_contact='" + id_contact + "'";

    contactVar.find('all', {where: where}, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.length == 1){// found
            var response = '{"contactData": ' + JSON.stringify(rows) + '}';
            res.send(response);
        }
        else { // not found
            res.redirect("/login");
        }
    });
};

exports.updateState = function(id_contact, newState){
    var contactVar = new Contact();
    var sqlQuery = "UPDATE contact SET state='" + newState + "' WHERE id_contact ='" + id_contact + "'";

    contactVar.query(sqlQuery, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.changedRows > 0){
            //TODO: message: state updated
        }
        else{
            //TODO: message: state not updated
        }
    });
    contactVar.save();
};