"use strict";

//ToDoApp module
var ToDoApp = angular.module("ToDoApp",["ngResource","ui.router","LocalStorageModule"]);

ToDoApp.config(["localStorageServiceProvider", function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix("ToDoApp");
}]);


ToDoApp.run(["$rootScope", "AuthenticationManager","$state",
	function($rootScope, AuthenticationManager, $state) {
		//
		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.globals = {
				isAuthenticated : true,
				authenticatedUser : AuthenticationManager.authenticatedUser()
			}
		} else {
			$rootScope.globals = { isAuthenticated : false , authenticatedUser : null};
		}

		$rootScope.$on("$authSuccess", function(event, authenticatedUser) {
			$rootScope.globals = {
				isAuthenticated : true,
				authenticatedUser : authenticatedUser
			}
		});

		$rootScope.$on("$authFailed", function() {
			$rootScope.globals = {};
		});

		$rootScope.$on("$authCleared", function() {
			$rootScope.globals = {};
		});

		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) {
				if(toState.data.isSecure) {
					if(!$rootScope.globals.isAuthenticated) {
						event.preventDefault();
						$state.go("home page");
					}
				}

				if(toState.name === "home page" && $rootScope.globals.isAuthenticated) {
					event.preventDefault();
					$state.go("todo page");
				}
			});
	}]);




