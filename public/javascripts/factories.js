"use strict";

angular.module("ToDoApp").factory("User", ["$resource", function($resource) {
	return $resource("http://jsonplaceholder.typicode.com/users/:userId", {userId : "@id"});
}]);


angular.module("ToDoApp").factory("ToDo", ["$resource", function($resource) {
	return $resource("http://jsonplaceholder.typicode.com/todos/:todoId", 
		{todoId : "@id"}, {"update" : { method : "PUT"}});
}]);


angular.module("ToDoApp").factory("ServerErrorInterceptor", ["$location", 
	function($location) {
	return {
		response : function(response) {
			if(response.status === 500) {
				//server error
				$location.path = "/500";
			}

			return response;
		}
	}
}]);