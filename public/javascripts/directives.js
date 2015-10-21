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

angular.module("ToDoApp").directive("toDoElevator", function() {
	return {
		restrict : "E",
		template: '<div class="btn btn-primary pull-right"> <i class="glyphicon glyphicon-arrow-up"></i></div>',
		scope : {
		},
		link : function(scope, element, attrs) {
			element.click(function() {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			})
		}
	}
});