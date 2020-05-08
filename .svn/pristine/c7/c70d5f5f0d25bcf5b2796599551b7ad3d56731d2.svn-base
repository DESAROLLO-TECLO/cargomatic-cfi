angular.module(appTeclo).controller('consultaController',function ($scope, $filter, $timeout, growl, showAlert, invitadoService, cotizacionesService){
	
	$scope.solicitudes = [];
	$scope.estatus = [];
	
	$scope.filters = {parameter:0, clase:'col-md-offset-3', folio: '', 
		parameters:[{id:1, name:"Folio de Solicitud"}, {id:2, name:"Ruta"}]};
	
	invitadoService.getSolicitudes().success(function(data) {
		$scope.solicitudes = data.solicitudes;
		$scope.estatus = data.estatus;
		
		angular.forEach($scope.solicitudes, function(v, k, o){
			v.estatusObject = $filter('filter')($scope.estatus, {estatusId: v.estatusSolicitudId})[0];
		})
		
	}).error(function(data) {
		
	});
	
	cotizacionesService.obtenerDatosCotiza().success(function(data) {
		$scope.origenes = data.orgien;
		$scope.destinos = data.destino;
	}).error(function(data) {
		
	});
	
	$scope.changeFilter = function(o){
		if(o.id==1){
			$scope.filters.clase='';
		}else{
			$scope.filters.clase='col-md-offset-3';
		}
	}
	
	
	
});