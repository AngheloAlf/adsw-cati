/**
 * Created by nontraxx on 08-10-16.
 */

var index = require('../models/index');
var Db = index.Db;

var Project = Db.extend({
    tableName: "project"
});

function newProject(req, res, name, startdate, enddate, clientId, url){
    var pro = new Project({
        name: name,
        start_date: startdate,
        finish_date: enddate,
        id_client: clientId,
        url_survey: url
    });
    pro.save();
    getAllProjects(req, res);
}
exports.newProject = newProject;

exports.delProject = function(proid){
    var pro = new Project();
    pro.remove("id_project=" + proid);
    pro.save();
};

exports.getProject = function(res, req, proid){
    var pro = new Project;
    pro.find('all',{where:'id_project='+proid},function(err,rows){
        req.session.Pro=rows;
    });
};

function getAllProjects(req){
    var pro = new Project;
    pro.find('all', {}, function(err,rows){
        req.session.AllProjects = rows;
    });
}
exports.getAllProjects = getAllProjects;

exports.createNewProject = function(req, res){
    var common = require("../public/javascript/common");

    var name = req.body.proyectName;
    var startDate = req.body.proyectStart;
    var endDate = req.body.proyectEnd;
    var client = req.body.proyectClient;
    var url = req.body.proyectUrl;

    console.log(startDate);

    if(common.testAscii(name) && common.testDate(startDate) && common.testDate(endDate) && common.testIsANumber(client) && common.testUrl(url)){
        Project.newProject(req, res, name, startDate, endDate, client, url);
        return true;
    }
    else{
        //TODO: show validation error;
        return false;
    }
};
