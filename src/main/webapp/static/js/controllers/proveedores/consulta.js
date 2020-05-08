angular.module(appTeclo).controller("consultaController",
function($scope, $filter, $location, ModalService, proveedoresService, cotizacionesService) {
	
	$scope.origenes = [];
	$scope.destinos = [];
	$scope.proveedores = [];
	$scope.suppliersFilter = [];
	$scope.proveedoresFiltro = [];
	
	$scope.view = {};
	$scope.filters = {origin : {}, destination: {}};
	
	$scope.buscaProveedores = function(){
		$scope.proveedoresFiltro = [];
		if($scope.proveedores.length > 0){
			$scope.proveedoresFiltro = $scope.proveedores;
//			for(var i in $scope.proveedores){
//				if($scope.originObject.originalObject.id === $scope.proveedores[i].rutas[0].origenId.id
//						|| $scope.destinationObject.originalObject.destination.id === $scope.proveedores[i].rutas[0].destinoId.id){
//					$scope.proveedoresFiltro.push($scope.proveedores[i]);
//				}
//			}
		}else{
			
		}
	}
	
	$scope.nuevoProveedor = function() {
		proveedoresService.setFlag(false);
		$location.path('/registroProveedores');
	}
	
	initialData = function(){
		proveedoresService.obtenerDatosConsulta().success(function(data) {
			$scope.proveedores = data.proveedores;
			
			if(proveedoresService.getFlag()){
				$scope.proveedoresFiltro = $scope.proveedores;
			}
		}).error(function(data) {
			
		});
		
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			$scope.origenes = data.orgien;
			$scope.destinos = data.destino;
			$scope.suppliersFilter = data.proveedor;
		}).error(function(data) {
			
		});
	}

	initialData();
});