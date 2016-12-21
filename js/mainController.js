/*global angular */
var app = angular.module("timeTable", []);

app.controller("ngCtrl", function ($scope, $http) {
    "use strict";
    //Global App strings
    $scope.appName = "Autobusų tvarkaraštis";
    $scope.h_busNo = "Autobuso Nr.: ";
    $scope.h_stopName = "Stotelė : ";

    //Get JSON Data
    $http.get("busData.json").then(function (response) {
        $scope.busData = response.data;
    });
});
