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
        $http.get("/angular/project/" + projectID)
            .then(function(response){
                $scope.projectGetData = response.data.projectData;
            }
        );
    };
});