/**
 * Created by Anghelo on 27-10-2016.
 */

var index = require('../routes/index');
var User = require('../models/user.js');
var Client = require('../models/client.js');
var Project = require('../models/project.js');
var Contact = require('../models/contact.js');
var fs = require("fs");
var path = require("path");


exports.getUsers = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        User.sendAllUsers(req, res);
    });
};
exports.getUserData = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        User.sendUserById(req, res, req.params.idUser);
    });
};

exports.getClients = function(req, res){
    index.verificateLogin(req, res, true, function(req, res) {
        Client.sendAllClients(req, res);
    });
};
exports.getClientData = function(req, res){
    index.verificateLogin(req, res, true, function(req, res) {
        Client.sendClientById(req, res, req.params.idClient);
    });
};

exports.getProjects = function(req, res){
    index.verificateLogin(req, res, true, function(req, res) {
        Project.sendAllProjects(req, res);
    });
};
exports.getProjectData = function(req, res){
    index.verificateLogin(req, res, null, function(req, res) {
        Project.sendProjectById(req, res, req.params.idProject);
    });
};

exports.getContacts = function(req, res){
    index.verificateLogin(req, res, null, function(req, res){
        Contact.sendAllContacts(req, res);
    });
};
exports.getContactsData = function(req, res){
    index.verificateLogin(req, res, null, function(req, res){
        Contact.sendContactById(req, res, req.params.idContact);
    });
};
/*
exports.updateContactState = function(req, res){
    index.verificateLogin(req, res, null, function(req, res){
        Contact.updateState(req.params.idContact, req.params.newState);
    });
};
*/

exports.getRecordsData = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        var audioFolder = path.resolve(".", "public", "audioRecords", "project" + req.params.idProject);
        fs.readdir(audioFolder, function (err, files) {
            if(err){
                res.send("undefined");
            }
            else{
                res.send(JSON.stringify(files));
            }
        });
    });
};
exports.downloadFile = function(req, res){
    index.verificateLogin(req, res, true, function(req, res){
        res.sendfile(path.resolve(".", "public", "audioRecords", "project" + req.params.idProject, req.params.fileName));
    });
};
