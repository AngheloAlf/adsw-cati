/**
 * Created by Anghelo on 02-11-2016.
 */


var app = angular.module('getProyect', []);
app.controller('getProjectCtrl', function ($scope, $http) {
    $http.get("/angular/project")
        .then(function(response){
                $scope.projectsList = response.data.projectsData;
            }
        );
    $scope.getSelectedProject = function(){
        var projectID = document.getElementById("readProject").value;
        $http.get("/angular/project/" + projectID).then(function(response){
            var projectData = response.data.projectData;
            $http.get("/angular/client/" + projectData[0].id_client).then(function(response){
                projectData[0].id_client = response.data.clientData[0].name;
                $scope.projectGetData = projectData;
            });
        });
    };
});
