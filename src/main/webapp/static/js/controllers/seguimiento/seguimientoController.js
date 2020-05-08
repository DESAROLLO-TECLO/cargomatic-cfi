angular.module(appTeclo).controller('seguimientoController', function($scope, $filter, showAlert, growl, $controller,  $location, seguimientoServices, $timeout, cotizacionesService, solicitudes, estatusSeguimiento) {
	$scope.solicitudes = solicitudes.data;
	$scope.estatusSeguimiento = estatusSeguimiento.data;
	
	$scope.asignacionEstatus = function(){
		angular.forEach($scope.solicitudes, function(v, k, o){
			v.estatusObject = $filter('filter')($scope.estatusSeguimiento, {estatusId: v.estatusSolicitudId})[0];
		})
	}
	
	$scope.asignacionEstatus();
});