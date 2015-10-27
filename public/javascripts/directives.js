"use strict";

angular.module("ToDoApp").directive("toDoEnter", function() {
	return {
		restrict : "A",
		link : function(scope, element, attrs) {
			element.keypress(function(event) {
				//enter key
				if(event.keyCode === 13) {
					scope.$apply(attrs.toDoEnter);
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

angular.module("ToDoApp").directive("toDoHeartBeat", [ "$interval", "$http", function($interval, $http) {
	function beat(config) {
		$http(config).then(
			function(result){
				console.log(result);
			},
			function(error){
				console.log(error);
			});
	};

	return {
		restrict : "AE",
		scope : {
			config: "=config"
		},
		link : function(scope, element,attrs) {
			//invoke right away
			//if user keeps refreshing page
			beat(scope.config);

			var timer = $interval(beat, scope.config.interval,0,false,scope.config);

			element.on("$destroy", function() {
				$interval.cancel(timer);
			});
		}
	}
}]);