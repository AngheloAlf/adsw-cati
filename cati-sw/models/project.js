/**
 * Created by nontraxx on 08-10-16.
 */

var index = require('../models/index');
var Db = index.Db;

var Project = Db.extend({
    tableName: "project"
});

exports.newProject = function(req,res,name,startdate,enddate,url,clientid){
    var pro = new Project ({
        name:name,
        start_date:startdate,
        finish_date:enddate,
        id_client:clientid,
        url_survey:url
    }) ;
    pro.save();
};

exports.delProject = function(req,res,proid){
    var pro = new Project();
    pro.remove("id_project="+proid);
    pro.save();
};

exports.getProject = function(res,req,proid){
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

