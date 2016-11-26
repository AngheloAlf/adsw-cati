/**
 * Created by Anghelo on 27-10-2016.
 */

var index = require('../routes/index');
var User = require('../models/user.js');
var Client = require('../models/client.js');
var Project = require('../models/project.js');
var Contact = require('../models/contact.js');

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
    index.verificateLogin(req, res, false, function(req, res){
        Contact.sendAllContacts(req, res);
    });
};
exports.getContactsData = function(req, res){
    index.verificateLogin(req, res, false, function(req, res){
        Contact.sendContactById(req, res, req.params.idContact);
    });
};
