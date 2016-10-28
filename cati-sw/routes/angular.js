/**
 * Created by Anghelo on 27-10-2016.
 */

// TODO: put some security

exports.getUsers = function(req, res){
    var User = require('../models/user.js');
    User.sendAllUsers(req, res);
};
exports.getUserData = function(req, res){
    var User = require('../models/user.js');
    User.sendUserById(req, res, req.params.idUser);
};

exports.getClients = function(req, res){
    var Client = require('../models/client.js');
    Client.sendAllClients(req, res);
};
exports.getClientData = function(req, res){
    var Client = require('../models/client.js');
    Client.sendClientById(req, res, req.params.idClient);
};

exports.getProjects = function(req, res){
    var Project = require('../models/project.js');
    Project.sendAllProjects(req, res);
};
exports.getProjectData = function(req, res){
    var Project = require('../models/project.js');
    Project.sendProjectById(req, res, req.params.idProject);
};

