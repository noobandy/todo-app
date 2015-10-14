"use strict";

angular.module("ToDoApp").service("AuthenticationManager", [ "User", 
	"localStorageService","$rootScope",
	function(User, localStorageService, $rootScope) {
		return {
			authenticate : function(username, success, error) {
				var users = User.query({username : username}, function() {
					if(users.length > 0) {
						localStorageService.set("authenticatedUser", users[0]);
						//only interested in $rootScope.$on()
						$rootScope.$emit("$authSuccess", {authenticatedUser : users[0]});
						success();
					} else {
						$rootScope.$emit("$authFailed");
						error();
					}
				}); 
			},
			signOut : function() {
				localStorageService.clearAll();
				$rootScope.$emit("$authCleared");
			},
			isAuthenticated : function() {
				 
				if(this.authenticatedUser() !== null) {
					return true;
				} else {
					return false;
				}
			},
			authenticatedUser : function() {
				return localStorageService.get("authenticatedUser");
				
			}
		};
	}]);