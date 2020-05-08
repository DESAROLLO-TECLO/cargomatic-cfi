angular.module(appTeclo).controller('seguimientoProveedorController', function($scope, $filter, showAlert, growl, $location, $timeout,solicitudes) {
	
	$scope.showModal = false;
	$scope.showInput = false;
	$scope.disableSelect = false;
	$scope.showBoxRefused = false;
	$scope.titleModalDetalle = '';
	
	$scope.vo = {solicitudes: []};
	$scope.objectGeneralVO = {};
	$scope.objectModal = {};
	$scope.listaVehiculos = [];
	$scope.object = {co:'Confirmación ',de:'de ',us:'usuario'};
	
	
	
	if(solicitudes != undefined || solicitudes != null){
		angular.copy(solicitudes.data.solicitudes, $scope.vo.solicitudes);
		angular.copy(solicitudes.data,$scope.objectGeneralVO);
		angular.copy(solicitudes.data.camion, $scope.listaVehiculos);
		if($scope.listaVehiculos.length > 0){
			var otro = {"id": "0","nbTipoCamion": "Otro"};
			$scope.listaVehiculos.push(otro);
		}
	}
	
	$scope.mostrarModal = function (obj){
		$scope.showModal = true;
		if(obj != null){
			angular.copy(obj, $scope.objectModal);
			$scope.titleModalDetalle = obj.folio;
		}
	};
	
	
	$scope.changePrecio = function (data){
		var subtotal = parseFloat(data);
		var iva = parseFloat(0.16);
		var totalXIva = subtotal * iva;
		
		if(data != undefined){
			$scope.objectGeneralVO.nuTotal = (subtotal + totalXIva);
		}
	};
	
	$scope.validarOtro = function (data){
		//console.log(data);
		if(data != null && data.length > 0){
			$scope.showInput = true;
			$scope.disableSelect = true;
			$("#select2-tpVehiculoDisponible-container").text("Seleccione una opción");
			$scope.objectModal.tpVehiculoDisponible = undefined;
		}else{
			$scope.showInput = false;
			$scope.disableSelect = false;
		}
	};
	
	$scope.cancelarNbTpVehiculo = function (){
		$scope.showInput = false;
		$scope.disableSelect = false;
		$scope.objectModal.tpVehiculoDisponible = undefined;
		$scope.objectModal.nbTipoVehiculosDisponible = undefined;
		$("#select2-tpVehiculoDisponible-container").text("Seleccione una opción");
	};
	$scope.saveModal = function (data){
		angular.copy(data, $scope.object); 
		showAlert.confirmacion("¿Desea responder esta cotización?", testConfirmacion, $scope.object, testCancelConfirmacion);
	};
	
	
	testConfirmacion = function(o) {
		growl.success('Se repondió correctamente la cotización',{ttl: 4000});
		$scope.showModal = false;
		$("#boxOperaciones").removeClass("collapsed-box");
		$("#datosGenerales").removeClass("collapsed-box");
		/*$timeout( function(){
			
        }, 800);*/
	};
	
	testCancelConfirmacion = function() {
		return;
	};
	
	$scope.rechazarSolicitud = function (data){
		angular.copy(data, $scope.object); 
		showAlert.confirmacion("¿Está seguro de rechazar esta solicitud?", confirmRechazo, $scope.object, cancelaRechazo);
	};
	
	confirmRechazo = function(o) {
		$("#boxOperaciones").addClass("collapsed-box");
		$("#datosGenerales").addClass("collapsed-box");
		$scope.showBoxRefused = true;
		/*growl.success('Se repondió correctamente la cotización',{ttl: 4000});
		$timeout( function(){
			$scope.showModal = false;
        }, 800);*/
	};
	cancelaRechazo = function (){
		return;
	};
	
	
	$scope.resetModal = function (){
		$("#boxOperaciones").removeClass("collapsed-box");
		$("#datosGenerales").removeClass("collapsed-box");
		$scope.showBoxRefused = false;
		$("#select2-tpVehiculoDisponible-container").text("Seleccione una opción");
		$scope.objectGeneralVO.nuTotal = undefined;
		$scope.showModal = false;
		$scope.titleModalDetalle = '';
		
	};
	
	$scope.guardarRechazo = function (){
		$("#boxOperaciones").removeClass("collapsed-box");
		$("#datosGenerales").removeClass("collapsed-box");
		$scope.showBoxRefused = false;
		growl.success('Se rechazó correctamente la solicitud',{ttl: 4000});
		$("#select2-tpVehiculoDisponible-container").text("Seleccione una opción");
		$scope.objectGeneralVO.nuTotal = undefined;
		$scope.showModal = false;
	};
});