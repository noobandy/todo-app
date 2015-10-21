"use strict";

angular.module("ToDoApp").controller("NavbarController", ["$rootScope",
	"AuthenticationManager", "$state","$scope", "$translate","NLCommandService",
	"$timeout",
	function($rootScope, AuthenticationManager, $state, $scope, $translate, NLCommandService,
		$timeout) {
		$scope.signOut = function() {
			AuthenticationManager.signOut();
			$state.go("home page");
		}

		$scope.changeLanguage = function(locale) {
			$translate.use(locale);
		}


		$scope.command = "";
		

		$scope.run = function() {
			NLCommandService.getState($scope.command).then(function(response) {
				console.log(response);
				$state.go(response.data);
				$scope.command = "";
			}, function(error) {
				console.log(error);
			})
			
		}

		$scope.microphone = function() {
			var recognition = new webkitSpeechRecognition();
			recognition.lang = "en-GB";
			recognition.onresult = function(event) { 
				console.log(event.results[event.resultIndex][event.resultIndex].transcript);
				$scope.command = event.results[event.resultIndex][event.resultIndex].transcript;
				$scope.$apply();
				//introduce 1 sec delay so that user can see what he said
				$timeout(function() {
					$scope.run();
				},1000);
				
			}
			recognition.start();
		}


		
	}]);

angular.module("ToDoApp").controller("HomeController", ["$scope","User",
	"$state","AuthenticationManager", 
	function($scope, User, $state, AuthenticationManager) {

		$scope.loginModel = { username : "", wrongCredentials : false, failedCount : 0};

		$scope.signIn = function(loginModel) {

			AuthenticationManager.authenticate(loginModel.username, function() {
				$state.go("todo page");
			}, function() {
				loginModel.failedCount = loginModel.failedCount + 1;
				loginModel.wrongCredentials = true;
			});
		}
	}]);


angular.module("ToDoApp").controller("ToDoController", ["$rootScope", "$scope", "ToDo",
	"todos",
	function($rootScope, $scope, ToDo, todos) {
		$scope.todos = todos;
		$scope.newToDo = new ToDo();

		$scope.create = function() {
			
			$scope.newToDo.completed = false;
			$scope.newToDo.userId = $rootScope.globals.authenticatedUser.id;
			$scope.todos.unshift($scope.newToDo);
			$scope.newToDo.$save();
			$scope.newToDo = new ToDo();
		};

		$scope.complete = function(todo) {
			todo.completed = true;

			todo.$update();

		};

		$scope.changeTitle = function(todo) {
			todo.$update();
		};

		$scope.delete = function(todo) {
			var index = $scope.todos.indexOf(todo);
			$scope.todos.splice(index, 1);   
			todo.$delete();
		};

	}]);