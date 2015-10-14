"use strict";

angular.module("ToDoApp").controller("NavbarController", ["$rootScope",
	"AuthenticationManager", "$state","$scope",
	function($rootScope, AuthenticationManager, $state, $scope) {
		$scope.signOut = function() {
			AuthenticationManager.signOut();
			$state.go("home page");
		}
	}]);

angular.module("ToDoApp").controller("HomeController", ["$scope","User",
	"$state","AuthenticationManager", 
	function($scope, User, $state, AuthenticationManager) {
		$scope.username = "";
		$scope.loginError = false;
		$scope.signIn = function() {
			AuthenticationManager.authenticate($scope.username, function() {
				$scope.loginError = false;
				$state.go("todo page");
			}, function() {
				$scope.loginError = true;
			});
		}
	}]);


angular.module("ToDoApp").controller("ToDoController", ["$rootScope", "$scope", "ToDo",
	function($rootScope, $scope, ToDo) {
		$scope.todos = ToDo.query({userId : $rootScope.globals.authenticatedUser.id});
		$scope.newToDoTitle = "";

		$scope.create = function() {
			var todo = new ToDo();
			todo.title = $scope.newToDoTitle;
			$scope.newToDoTitle = "";
			todo.completed = false;
			todo.userId = $rootScope.globals.authenticatedUser.id;
			$scope.todos.unshift(todo);
			todo.$save();
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