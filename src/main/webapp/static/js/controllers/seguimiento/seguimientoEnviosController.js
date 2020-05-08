angular.module(appTeclo).controller('seguimientoEnviosController', function($scope, $filter, showAlert, growl, $controller,  $location, seguimientoServices, $timeout, cotizacionesService, envios, estatusEnviosSeguimiento, solicitudes, solicitud) {
	$scope.envios = envios.data;
	$scope.estatusEnvio = estatusEnviosSeguimiento.data;
	$scope.solicitud = $filter('filter')(solicitudes.data, {jsonFile : "/"+solicitud})[0]; 
	
	$scope.asignacionEstatus = function(){
		angular.forEach($scope.envios, function(v, k, o){
			v.estatusObject = $filter('filter')($scope.estatusEnvio.estatusSeguimiento, {estatusId: v.envioEstatusId})[0];
		})
	}
	
	$scope.asignacionEstatus();
	
	$scope.proveedorSeleccionado = false;
	$scope.setProveedorSeleccionado = function(estatusEnvio){
		$scope.proveedorSeleccionado = estatusEnvio;
	};
});