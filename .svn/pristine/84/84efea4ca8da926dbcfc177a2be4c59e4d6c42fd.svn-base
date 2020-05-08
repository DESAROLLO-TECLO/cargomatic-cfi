angular.module(appTeclo)
.controller("loginController",
function($rootScope,$scope,$location,$window,$timeout,
		loginService,storageService,logOutService, messageFactory) {
	
	var btnLogin = $('#login-btn');
	
	$scope.inputType = 'password';
	$scope.b_hidePassword = true;
	
	$scope.showClave = function() {
		loginService.safeApply(function() {
			$scope.inputType = 'text';
			$scope.b_hidePassword = false;
		});
	}
	
	$scope.hideClave = function() {
		loginService.safeApply(function() {
			$scope.inputType = 'password';
			$scope.b_hidePassword = true;
		});
	}
	
	$scope.login = function() {
		
		loginService.getUsers().success(function(data) {
			
			let response = loginService.login(data, $scope.user);
			
			if(response.token !== undefined) {
				btnLogin.attr('disabled', 'true');
				storageService.setToken(response.token);
				logOutService.StartTimer();
				$location.path('/index');
				$timeout($rootScope.comprobarConfiguracion, 500);
			} else {
				$scope.error = {}
				$scope.error.message = response.message;
			}
			
		}).error(function(data) {
			
			$scope.error = data;
			
			if(data.status == undefined || data == null) {
	 			$scope.error = {
					
					message:messageFactory.getErrorMessage(420),
	 			
				}
			}
		});
	};
});