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

    /*var where = "first_name='" + firstName + "' AND last_name='" + lastName + "'";
    contactVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }

        if(rows.length == 0){ //This contact does not exist in the contacts db
            console.log(firstName + " " + lastName + " " + number + " " + email + " " + idProject);
            var contact = new Contact({first_name: firstName, last_name: lastName, number: number, email: email, id_project: idProject});
            contact.save();
        }
        else{
            console.log("failure :C");
            //TODO: show error - contact exists in the db
        }
    });*/
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
