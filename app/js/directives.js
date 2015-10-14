"use strict";

angular.module("ToDoApp").directive("toDoEnter", function() {
	return {
		restrict : "A",
		scope : {
			toDoEnter : "&"
		},
		link : function(scope, element, attrs) {
			element.keypress(function(event) {
				//enter key
				if(event.keyCode === 13) {
					scope.toDoEnter();
				}
			});
		}
	}
});