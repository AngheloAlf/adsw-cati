/**
 * Created by Anghelo on 06-11-2016.
 */


var app = angular.module('getContact', []);
app.controller('getContactCtrl', function ($scope, $http) {
    var form = {numberCall: 0, newState: "Activo", submitButton: "updateContactState"};
    $http.get("/angular/contact").then(function (response){
        //$scope.contactsList = response.data.contactsData;
        var contacts = response.data.contactsData;
        var id, name, number, project, call = false;
        for(var i = 0; i < contacts.length; i++){
            switch(contacts[i].state.toLowerCase()){
                case "si":
                case "permanentemente inactivo":
                case "temporalmente inactivo":
                    continue;
                    break;
                case "activo":
                case "no":
                    $scope.projectId = contacts[i].id_project;
                    id = contacts[i].id_contact;
                    name = capitalizeFirstLetter(contacts[i].first_name) + " " + capitalizeFirstLetter(contacts[i].last_name);
                    number = fixNumber(contacts[i].number);
                    project = contacts[i].id_project;
                    call = true;
                    break;
            }
            if(call){
                break;
            }
        }
        if(!call){
            for(i = 0; i < contacts.length; i++){
                switch (contacts[i].state.toLowerCase()) {
                    case "si":
                    case "permanentemente inactivo":
                        continue;
                        break;
                    case "temporalmente inactivo":
                        $scope.projectId = contacts[i].id_project;
                        id = contacts[i].id_contact;
                        name = capitalizeFirstLetter(contacts[i].first_name) + " " + capitalizeFirstLetter(contacts[i].last_name);
                        number = fixNumber(contacts[i].number);
                        project = contacts[i].id_project;
                        call = true;
                        break;
                }
                if(call){
                    break;
                }
            }
        }
        var callButton = document.getElementById("callButton");
        var numberCall = document.getElementById("numberCall");
        var survey = document.getElementById("survey");
        var surveyLink = document.getElementById("surveyLink");
        var hiddenNumber = document.getElementById("hiddenNumber");
        if(call){
            $http.get("/angular/project/" + project).then(function (response){
                callButton.setAttribute('href', 'skype:' + number + '?call');
                hiddenNumber.value = number;
                numberCall.value = id;
                callButton.innerHTML = 'Llamar a ' + name;
                survey.innerHTML = '<iframe src="' + response.data.projectData[0].url_survey + '" width="900" height="400"></iframe>';
                surveyLink.setAttribute('href', response.data.projectData[0].url_survey);
            });
        }
        else{
            callButton.removeAttribute('href');
            callButton.innerHTML = 'No se ha encontrado a nadie disponible para llamar.';
        }
    });
    $scope.updateState = function(){
        $scope.form.numberCall = document.getElementById("numberCall").value;
        $scope.form.submitButton = document.getElementById("submitButton").value;
        $http.post("/user", JSON.stringify($scope.form)).success(function(){
            alert("Estado actualizado satisfactoriamente.");
        }).error(function(){
            alert("Ha ocurrido un error al actualizar el estado.");
        });
    };
});
