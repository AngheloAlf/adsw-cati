/**
 * Created by Anghelo on 26-11-2016.
 */


var app = angular.module('getProject', []);
app.controller('getProjectCtrl', function ($scope, $http) {
    $http.get("/angular/project").then(function(response){
        $scope.projectsList = response.data.projectsData;
    });

    $scope.getRecordsFromProject = function(){
        var projectID = document.getElementById("downloadProject").value;
        $http.get("/angular/records/" + projectID).then(function(response){
            var projectData = response.data;
            var downloadError = document.getElementById("downloadError");
            console.log(projectData);
            if(projectData.length == 0 || projectData == "undefined"){
                downloadError.innerHTML = "El proyecto seleccionado no tiene ninguna grabación.";
                $scope.audiosList = [];
            }
            else{
                downloadError.innerHTML = "";
                $scope.audiosList = projectData;
           }
        });
    };
});
