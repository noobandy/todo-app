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
      templateUrl: "/public/templates/home.html",
      controller : "HomeController",
      data : {
        isSecure : false
      }
    }).state('temp page', {
      url: "/temp",
      template: "/public/templates/home.html",
      data : {
        isSecure : false
      }
    })
    .state('todo page', {
      url: "/todos",
      templateUrl: "/public/templates/todos.html",
      controller: "ToDoController",
      data : {
        isSecure : true
      },
      resolve : {
        todos : ["ToDo", "$rootScope",
        function(ToDo, $rootScope) {
          return ToDo.query({
            userId : $rootScope.globals.authenticatedUser.id
          }).$promise.then(function(result) {
            return result;
          });
        }]
      }
    }).state("something went wrong", {
      url : "/500",
      templateUrl: "/public/templates/500.html",
      data: {
        isSecure : false
      }
    }).state("not found", {
      url : "/404",
      templateUrl: "/public/templates/404.html",
      data: {
        isSecure : false
      }
    }).state("about page", {
      url: "/about",
      templateUrl : "/public/templates/about.html",
      data : {
        isSecure : false
      }
    });
}]);