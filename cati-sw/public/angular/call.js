/**
 * Created by Anghelo on 06-11-2016.
 */


var app = angular.module('getContact', []);
app.controller('getContactCtrl', function ($scope, $http) {
    $http.get("/angular/contact")
        .then(function (response) {
                $scope.contactsList = response.data.contactsData;
            }
        );
    $scope.putNumberToCall = function(){
        var numberCallID = document.getElementById("numberCall").value;
        $http.get("/angular/contact/" + numberCallID)
            .then(function(response){
                var callButton = document.getElementById("callButton");
                var contactData = response.data.contactData[0];
                callButton.setAttribute('href', 'skype:' + fixNumber(contactData.number) + '?call');
                callButton.innerHTML = 'Llamar a ' + contactData.first_name + " " + contactData.last_name;
            });
    };
});
