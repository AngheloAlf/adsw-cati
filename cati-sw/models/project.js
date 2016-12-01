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

//TODO: ask what to do with the foreigns keys (contact table)
exports.delProject = function(proid){
    var projectvar = new Project();
    var where = "id_project='" + proid+"'";
    projectvar.remove(where, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.affectedRows == 1){
            //TODO: show project deleted
        }
        else{
            //TODO: show error
        }
    });
    projectvar.save();
};

exports.hideProject = function(id_project){
    var projectVar = new Project();
    var sqlQuery = "UPDATE project SET deleted='1' WHERE id_project='" + id_project + "'";
    projectVar.query(sqlQuery, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.changedRows > 0){
            //TODO: message: deleted
        }
        else{
            //TODO: message: not deleted
        }
    });
    projectVar.save();
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

    var name = req.body.projectName;
    var startDate = req.body.projectStart;
    var endDate = req.body.projectEnd;
    var client = req.body.projectClient;
    var url = req.body.projectUrl;

    newProject(name, startDate, endDate, client, url);
    return true;

    //TODO: debug
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
    var projectVar = new Project();
    var where = "deleted='0' AND id_project='" + id_project + "'";

    projectVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){
            // Show not found
            res.redirect("/login");
        }
        else {//login user
            res.send('{"projectData": [{"id_project": "' + rows[0].id_project + '", "name": "' + rows[0].name + '", "start_date": "' + rows[0].start_date.split(" ")[0] + '", "finish_date": "' + rows[0].finish_date.split(" ")[0] + '", "id_client": "' + rows[0].id_client + '", "url_survey": "' + rows[0].url_survey + '"}]}');
        }
    });
};

exports.sendAllProjects = function(req, res){
    var projectVar = new Project();
    var where = "deleted='0'";

    projectVar.find('all', {where: where}, function (err, rows){
        if(err){
            throw err;
        }
        if(rows[0] === undefined){

            res.redirect("/login");
            // Show not found
        }
        else {//login user
            var response = '{"projectsData": [';
            for(var i = 0; i < rows.length; i++){
                if(i>0){
                    response += ', ';
                }
                response += '{"id_project": "' + rows[i].id_project + '", "name": "' + rows[i].name + '", "start_date": "' + rows[i].start_date.split(" ")[0] + '", "finish_date": "' + rows[i].finish_date.split(" ")[0] + '", "id_client": "' + rows[i].id_client + '", "url_survey": "' + rows[i].url_survey + '"}';
            }
            response += ']}';
            res.send(response);
        }
    });
};

