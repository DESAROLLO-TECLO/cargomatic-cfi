angular.module(appTeclo).controller('ordenesEnvioController',function ($scope, $filter,growl,showAlert,pedidosService){

	$scope.objectPedidos={};
	
	
	pedidosService.obtenerPedidos().success(function(data){
		$scope.objectPedidos=data;
	});
	
	$scope.listEstados=$scope.objectPedidos.estados;
	
	
});
	