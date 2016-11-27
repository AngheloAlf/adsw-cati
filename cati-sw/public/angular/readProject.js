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
        $http.get("/angular/records/" + projectID).then(function(response){
            var projectData = response.data;
            var downloadError = document.getElementById("downloadError");
            if(projectData.length == 0 || projectData == "undefined"){
                downloadError.innerHTML = "El proyecto seleccionado no tiene ninguna grabación.";
                $scope.audiosList = [];
            }
            else{
                downloadError.innerHTML = "";
                $scope.audiosList = projectData;
            }
        });
        $http.get("/angular/contact/").then(function(response){
            var contactsArray = [];
            var contactsData = response.data.contactsData;
            for(var i = 0; i < contactsData.length; i++){
                if(contactsData[i].state.toLowerCase() == "si"){
                    contactsData[i].state = "Permanentemente inactivo";
                }
                else if(contactsData[i].state.toLowerCase() == "no"){
                    contactsData[i].state = "Activo";
                }
                if(contactsData[i].id_project == projectID){
                    contactsArray.push(contactsData[i]);
                }
            }
            $scope.contactsData = contactsArray;
        });
    };
});
