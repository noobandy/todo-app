"use strict";

angular.module("ToDoApp").controller("NavbarController", ["$rootScope",
	"AuthenticationManager", "$state","$scope",
	function($rootScope, AuthenticationManager, $state, $scope) {
		$scope.signOut = function() {
			AuthenticationManager.signOut();
			$state.go("home page");
		}

		$scope.about = function() {
			
		}
	}]);

angular.module("ToDoApp").controller("HomeController", ["$scope","User",
	"$state","AuthenticationManager", 
	function($scope, User, $state, AuthenticationManager) {

		$scope.loginModel = { username : "", wrongCredentials : false};
		
		$scope.signIn = function(loginModel) {
			loginModel.submitted = true;

			AuthenticationManager.authenticate(loginModel.username, function() {
				$state.go("todo page");
			}, function() {
				loginModel.wrongCredentials = true;
			});
		}
	}]);


angular.module("ToDoApp").controller("ToDoController", ["$rootScope", "$scope", "ToDo",
	function($rootScope, $scope, ToDo) {
		$scope.todos = ToDo.query({userId : $rootScope.globals.authenticatedUser.id});
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