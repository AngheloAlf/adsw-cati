/**
 * Created by Anghelo on 28-10-2016.
 */

var app = angular.module('getUserTable', []);
app.controller('getUserTableCtrl', function ($scope, $http) {
    $http.get("/angular/user")
        .then(function(response){
            $scope.usersList = response.data.usersData;
        }
    );
    $scope.getSelectedUser = function(){
        var userID = document.getElementById("readUser").value;
        $http.get("/angular/user/" + userID)
        .then(function(response){
            $scope.userGetData = response.data.userData;
        });
    };
});
