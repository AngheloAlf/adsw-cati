/**
 * Created by nontraxx on 08-10-16.
 */

var index = require('../models/index');
var Db = index.Db;

var Project = Db.extend({
    tableName: "project"
});

function newProject(name, startdate, enddate, clientId, url){
    var pro = new Project({
        name: name,
        start_date: startdate,
        finish_date: enddate,
        id_client: clientId,
        url_survey: url
    });
    pro.save();
}
exports.newProject = newProject;

exports.delProject = function(req, res, proid){
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

exports.getAllProjects = function(res,req){
    var pro = new Project;
    pro.find('all',{where:''},function(err,rows){
        req.session.AllProjects=rows;
    });
};

exports.createNewProject = function(res, req){
    var common = require("../public/javascript/common");

    var name = req.body.proyectName;
    var startDate = req.body.proyectStart;
    var endDate = req.body.proyectEnd;
    var client = req.body.proyectClient;
    var url = req.body.proyectUrl;

    console.log(startDate);

    if(common.testAscii(name) && common.testDate(startDate) && common.testDate(endDate) && common.testIsANumber(client) && common.testUrl(url)){
        Project.newProject(name, startDate, endDate, client, url);
        return true;
    }
    else{
        //TODO: show validation error;
        return false;
    }
};
