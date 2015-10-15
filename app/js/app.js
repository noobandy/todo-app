"use strict";

//ToDoApp module
var ToDoApp = angular.module("ToDoApp",["ngResource","ui.router","LocalStorageModule","xeditable"]);

ToDoApp.config(["localStorageServiceProvider","$httpProvider",
	function(localStorageServiceProvider, $httpProvider) {
		localStorageServiceProvider.setPrefix("ToDoApp");
		$httpProvider.interceptors.push("ServerErrorInterceptor");
	}]);


ToDoApp.run(["$rootScope", "AuthenticationManager","$state","editableOptions",
	function($rootScope, AuthenticationManager, $state,editableOptions) {
		editableOptions.theme = "bs3";
		//
		$rootScope.globals = {};
		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = AuthenticationManager.authenticatedUser();
		} else {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
		}

		$rootScope.$on("$authSuccess", function(event, data) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = data.authenticatedUser;
		});

		$rootScope.$on("$authFailed", function() {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
		});

		$rootScope.$on("$authCleared", function() {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
		});

		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) {
				
				$rootScope.globals.showLoader = true;

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

		$rootScope.$on("$stateChangeSuccess",
			function(event) {
				$rootScope.globals.showLoader = false;
			});

	}]);




