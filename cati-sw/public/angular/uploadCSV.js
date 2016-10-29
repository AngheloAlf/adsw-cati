/**
 * Created by Anghelo on 29-10-2016.
 */

var app = angular.module('getProject', []);
app.controller('getProjectCtrl', function($scope, $http){
    $http.get("/angular/project")
        .then(function(response){
            console.log(response.data);
            $scope.projectsList = response.data.projectsData;
        }
    );
});
