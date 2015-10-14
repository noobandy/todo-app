"use strict";

angular.module("ToDoApp").factory("User", ["$resource", function($resource) {
	return $resource("http://jsonplaceholder.typicode.com/users/:userId", {userId : "@id"});
}]);


angular.module("ToDoApp").factory("ToDo", ["$resource", function($resource) {
	return $resource("http://jsonplaceholder.typicode.com/todos/:todoId", 
		{todoId : "@id"}, {"update" : { method : "PUT"}});
}]);