"use strict";

//ToDoApp module
var ToDoApp = angular.module("ToDoApp",["ngResource","ui.router","LocalStorageModule","xeditable",
	"pascalprecht.translate", "angular-loading-bar"]);

ToDoApp.config(["localStorageServiceProvider",
	function(localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix("ToDoApp");
	}]);


ToDoApp.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: '/public/languages/',
			suffix: '.json'
		}]
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
}]);

ToDoApp.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.spinnerTemplate = '<div id="pluswrap">\
	<div class="plus">\
	<img src="/public/images/loader.gif">\
	</div>\
	</div>';

}])

ToDoApp.run(["$rootScope", "AuthenticationManager","$state","editableOptions",
	function($rootScope, AuthenticationManager, $state,editableOptions) {
		editableOptions.theme = "bs3";
		//
		$rootScope.globals = {
			heartBeatConfig : {
				url : "/heartbeat",
				method: "GET",
				params : {
					user : null
				},
				interval: 60000
			}
		};

		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = AuthenticationManager.authenticatedUser();
			$rootScope.globals.heartBeatConfig.params.user =  AuthenticationManager.authenticatedUser().username;
		} else {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
			$rootScope.globals.heartBeatConfig.params.user =  null;
		}

		$rootScope.$on("$authSuccess", function(event, data) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = data.authenticatedUser;
			$rootScope.globals.heartBeatConfig.params.user =  AuthenticationManager.authenticatedUser().username;
		});

		$rootScope.$on("$authCleared", function() {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
			$rootScope.globals.heartBeatConfig.params.user =  null;
		});

		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) {
				
				//$rootScope.globals.showLoader = true;

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
				//$rootScope.globals.showLoader = false;
			});

	}]);




