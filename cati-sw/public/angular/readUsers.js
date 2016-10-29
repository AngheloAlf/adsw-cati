/**
 * Created by Anghelo on 28-10-2016.
 */

var app = angular.module('getUserTable', []);
app.controller('getUserTableCtrl', function ($scope, $http) {
    //$scope.usersList = {"usersData": [{"id_user": "1", "name": "Anghelo", "rut": "19125145-8", "email": "angheloalf95@gmail.com"}, {"id_user": "2", "name": "Ignacio", "rut": "19306593-7", "email": "maill@mail.mail"}, {"id_user": "4", "name": "Alf", "rut": "19125145-8", "email": "mail@mail.com"}]}.usersData;
    $http.get("/angular/user")
        .then(function(response){
            $scope.usersList = response.data.usersData;
        });
     $scope.getSelectedUser = function(){
         var userID = document.getElementById("readUser").value;
         $http.get("/angular/user/" + userID)
         .then(function(response){
            $scope.userGetData = response.data.userData;
         });
     };
});
