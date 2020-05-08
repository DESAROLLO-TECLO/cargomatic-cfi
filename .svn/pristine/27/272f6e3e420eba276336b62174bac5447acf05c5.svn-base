angular.module(appTeclo).controller('seguimientoControllerProt1', function($scope, $filter, showAlert, growl, $controller,  $location, seguimientoServices,$timeout,cotizacionesService) {
	$scope.tipoSeguimiento = [];
	$scope.view = {showModalRating: false};
	$scope.filters = {parameter:'', clase:'col-md-offset-3', client: '', parameters:[{id:1, name:"Cliente"},{id:2, name:"Ruta"},{id:3, name:"Folio de Operación"}]};
	$scope.filters.parameter = $scope.filters.parameters[2];
	
	$scope.objectCotizado = undefined;
	
	if(angular.isDefined(seguimientoServices.getCotizada())){
		$scope.objectCotizado = seguimientoServices.getCotizada();
	}
	
	cotizacionesService.obtenerDatosCotiza().success(function(data) {
		$scope.origenes = data.orgien;
		$scope.destinos = data.destino;
	}).error(function(data) {
		
	});
	
	$scope.action = function(object){
		if(object.action === "001") { 
			showAlert.confirmacion("¿Desea contratar el envío del cliente: " + object.nombre +"?", confirm, object, cancel1);
		}else if(object.action === "002") {
			showAlert.confirmacion("¿Desea finalizar la cotización del cliente: " + object.nombre+ "?", confirm, object, cancel2);
		}else if(object.action === "003"){
			showAlert.confirmacion("¿Desea confirmar la solicitud: " + object.nombre+ "?", confirm, object, cancel3);
		}else if(object.action === "005") {
			$location.path("/proveedores/" + object.id);
		}else if(object.action === "007"){
			$timeout(function (){
				$location.path("/listadoCotizaciones");
			},300);
		}
	}
	
	confirm = function(o){
		if(o.action === "001"){ 
			o.statusCod = "04";
			o.statusCodLetra = "Cont";
			o.status = "Contratado";
			o.label = "label-success";
			o.labelAction = "";
			o.action = "004";
			//growl.success('',{title: 'Envío Contratado'});
			seguimientoServices.setCotizada(o);
			$timeout(function (){
				$location.path("/contratacion/" + o.id)
			},300);
		}else if(o.action === "002"){
			o.statusCod = "01";
			o.statusCodLetra = "REV";
			o.status = "Revisado";
			o.label = "label-default";
			o.labelAction = "Contratar";
			o.action = "001";
			growl.success('',{title: 'Cotización Finalizada'});
		}else if(o.action === "003"){
			o.statusCod = "01";
			o.statusCodLetra = "REV";
			o.status = "Revisado";
			o.label = "label-default";
			o.labelAction = "Contratar";
			o.action = "001";
			growl.success('',{title: 'Solicitud Confirmada'});
		}else if(o.action === "004"){
			
		}
		else if(o.action === "005"){
			
		}
	}
	
	cancel1 = function (){
		growl.info('',{title: 'Se canceló la contratación del envío'});
	}
	cancel2 = function (){
		growl.info('',{title: 'Se canceló la finalización de la cotización'});
	}
	cancel3 = function (){
		growl.info('',{title: 'Se canceló la confirmación de la solicitud'});
	}
	
	$scope.changeFilter = function(o){
		if(o.id==1 || o.id==3){
			$scope.filters.clase='';
		}else{
			$scope.filters.clase='col-md-offset-3';
		}
	}
	
	$scope.changeFilter({id:3});
	
	$scope.buscarSolicitudes = function(){
		seguimientoServices.setSearch(true);
		seguimientoServices.getSeguimientos().success(function(data) {
			$scope.tipoSeguimiento = data.solicitudes;
			for(var i in $scope.tipoSeguimiento){
				if(angular.isDefined($scope.objectCotizado)){
					if($scope.tipoSeguimiento[i].id == $scope.objectCotizado.id){
						$scope.tipoSeguimiento[i].statusCod = $scope.objectCotizado.statusCod;
						$scope.tipoSeguimiento[i].statusCodLetra = $scope.objectCotizado.statusCodLetra;
						$scope.tipoSeguimiento[i].status = $scope.objectCotizado.status;
						$scope.tipoSeguimiento[i].label = $scope.objectCotizado.label;
						$scope.tipoSeguimiento[i].labelAction = $scope.objectCotizado.labelAction;
						$scope.tipoSeguimiento[i].action = $scope.objectCotizado.action;
					}
				}
				if($scope.tipoSeguimiento[i].statusCod === "01"){
					$scope.tipoSeguimiento[i].labelAction = "Contratar";
					$scope.tipoSeguimiento[i].action = "001";
					
				}if($scope.tipoSeguimiento[i].statusCod === "02"){
					$scope.tipoSeguimiento[i].labelAction = "Finalizar cotización";
					$scope.tipoSeguimiento[i].action = "002";
					
				}if($scope.tipoSeguimiento[i].statusCod === "03"){
					$scope.tipoSeguimiento[i].labelAction = "Confirmar solicitud";
					$scope.tipoSeguimiento[i].action = "003";
					
				}if($scope.tipoSeguimiento[i].statusCod === "04"){
					$scope.tipoSeguimiento[i].labelAction = "";
				}if($scope.tipoSeguimiento[i].statusCod === "05"){
					$scope.tipoSeguimiento[i].labelAction = "Cotizar";
					$scope.tipoSeguimiento[i].action = "005";
				}if($scope.tipoSeguimiento[i].statusCod === "06"){
					$scope.tipoSeguimiento[i].labelAction = "";
				}
				if($scope.tipoSeguimiento[i].statusCod === "07"){
					$scope.tipoSeguimiento[i].labelAction = "Verificar cotizaciones";
					$scope.tipoSeguimiento[i].action = "007";
				}
			}
			
		}).error(function(data) {
					
		});
	}
	
	if(!seguimientoServices.getSearch()){
		$scope.buscarSolicitudes();
	}
	
	if(seguimientoServices.getSearch()){
		$scope.buscarSolicitudes();
		seguimientoServices.setSearch(false);
	}
	
	//Flujo Estatus.
		/*
		 * En Revisión
		 * Revisado
		 * 
		 * 
		 * */
	
	
});