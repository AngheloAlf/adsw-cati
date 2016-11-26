/**
 * Created by Anghelo on 06-11-2016.
 */


var app = angular.module('getContact', []);
app.controller('getContactCtrl', function ($scope, $http) {
    $http.get("/angular/contact").then(function (response){
        //$scope.contactsList = response.data.contactsData;
        var contacts = response.data.contactsData;
        var id, name, number, project, call = false;
        for(var i = 0; i < contacts.length; i++){
            console.log(contacts[i].state);
            switch(contacts[i].state.toLowerCase()){
                case "si":
                case "permanentemente inactivo":
                case "temporalmente inactivo":
                    continue;
                    break;
                case "activo":
                case "no":
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
        var callButton = document.getElementById("callButton");
        var numberCall = document.getElementById("numberCall");
        var survey = document.getElementById("survey");
        var surveyLink = document.getElementById("surveyLink");
        if(call){
            $http.get("/angular/project/" + project).then(function (response){
                callButton.setAttribute('href', 'skype:' + number + '?call');
                numberCall.value = id;
                callButton.innerHTML = 'Llamar a ' + name;
                survey.innerHTML = '<iframe src="' + response.data.projectData[0].url_survey + '" width="900" height="400"></iframe>';
                surveyLink.setAttribute('href', response.data.projectData[0].url_survey);
            });
        }
        else {
            callButton.removeAttribute('href');
            callButton.innerHTML = 'No se ha encontrado a nadie disponible para llamar.';
        }
    });
    /*$scope.putNumberToCall = function(){
        var numberCallID = document.getElementById("numberCall").value;
        $http.get("/angular/contact/" + numberCallID)
            .then(function(response){
                var callButton = document.getElementById("callButton");
                var contactData = response.data.contactData[0];
                callButton.setAttribute('href', 'skype:' + fixNumber(contactData.number) + '?call');
                callButton.innerHTML = 'Llamar a ' + contactData.first_name + " " + contactData.last_name;
            });
    };*/
});
