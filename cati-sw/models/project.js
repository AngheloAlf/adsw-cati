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

exports.getAllProjects = function(req){
    var pro = new Project;
    pro.find('all', {}, function(err,rows){
        req.session.AllProjects = rows;
    });
};

exports.createNewProject = function(req){
    var common = require("../public/javascript/common");

    var name = req.body.proyectName;
    var startDate = req.body.proyectStart;
    var endDate = req.body.proyectEnd;
    var client = req.body.proyectClient;
    var url = req.body.proyectUrl;

    if(common.testAscii(name) && common.testDate(startDate) && common.testDate(endDate) && common.testIsANumber(client) && common.testUrl(url)){
        newProject(name, startDate, endDate, client, url);
        return true;
    }
    else{
        //TODO: show validation error;
        console.log("validation error");
        return false;
    }
};

exports.sendProjectById = function(req, res, id_project){
    projectVar = new Project();
    var where = "id_project='" + id_project + "'";

    projectVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){
            // Show not found
        }
        else {//login user
            res.send('{"projectData": [{"id_project": "' + rows[0].id_project + '", "name": "' + rows[0].name + '", "start_date": "' + rows[0].start_date + '", "finish_date": "' + rows[0].finish_date + '", "id_client": "' + rows[0].id_client + '", "url_survey": "' + rows[0].url_survey + '"}]}');
        }
    });
};

exports.sendAllProjects = function(req, res){
    projectVar = new Project();
    projectVar.find('all', {}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){
            // Show not found
        }
        else {//login user
            var response = '{"projectsData": [';
            for(var i = 0; i < rows.length; i++){
                if(i>0){
                    response += ', ';
                }
                response += '{"id_project": "' + rows[i].id_project + '", "name": "' + rows[i].name + '", "start_date": "' + rows[i].start_date + '", "finish_date": "' + rows[i].finish_date + '", "id_client": "' + rows[i].id_client + '", "url_survey": "' + rows[i].url_survey + '"}';
            }
            response += ']}';
            res.send(response);
        }
    });
};

