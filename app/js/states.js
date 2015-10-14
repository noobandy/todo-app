"use strict";

angular.module("ToDoApp").config(["$stateProvider", "$urlRouterProvider", 
  function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home page', {
      url: "/",
      templateUrl: "app/templates/home.html",
      controller : "HomeController",
      data : {
        isSecure : false
      }
    })
    .state('todo page', {
      url: "/todos",
      templateUrl: "app/templates/todos.html",
      controller: "ToDoController",
      data : {
        isSecure : true
      }
    });
}]);