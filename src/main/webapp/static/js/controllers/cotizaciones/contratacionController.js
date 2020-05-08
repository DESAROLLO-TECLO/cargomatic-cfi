angular.module(appTeclo).controller('contratacionController',function ($scope, $filter,growl,showAlert,blockUI,
		$location,cotizacionesService,contratacionService,idSolicitud,seguimientoServices){
	
	$scope.flag = angular.isDefined(idSolicitud);
	
	$scope.vo = {};
	$scope.vovoContrat = {};
	$scope.subcategoriaFiltrada = [];
	$scope.rutaHabilitada = true;
	$scope.transporteHabilitado = true;
	$scope.subcategoriasFiltro = [];
	$scope.deshabilitaCombo = false;
	$scope.solicitudes = [];
	$scope.objectSolicitud = {};
	$scope.idSolicitud = idSolicitud;
	
	$scope.obtenerDatosCotiza = function (){
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			angular.copy(data,$scope.vo);
			//console.log($scope.vo);
		});
	};
	$scope.obtenerDatosCon = function (){
		contratacionService.obtenerDatosCon().success(function(data) {
			angular.copy(data,$scope.vovoContrat);
			//$scope.vovoContrat.nbRuta = 1;
		});
	};
	$scope.obtenerDatosCotiza();
	$scope.obtenerDatosCon();
	
	
	
	/*$scope.filtroSubcategoria = function (idPadre, subcategoria){
		$scope.subcategoriaFiltrada = [];
		if(subcategoria.length > 0){
			for(var i in subcategoria){
				if(idPadre === subcategoria[i].idPadre){
					$scope.subcategoriaFiltrada.push(subcategoria[i]);
				}
			}
		}
	};*/
	

	
	$scope.cambioTipoTransporte = function (object){
		if(object.nbTipoTransporte != null && object.nbRuta != null){
			$scope.vovoContrat.nuTarifa = object.nbRuta.nuPrecioRuta;
			if($scope.vovoContrat.nuTarifa != null){
				$scope.vovoContrat.nuSubtotal = "$ 9,700.00";
				$scope.vovoContrat.nuTotal = "$ 10,300.00";
			}
		}else{
			$scope.vovoContrat.nuTarifaDif = undefined;
		}
		/*if(object != null){
			$scope.vovoContrat.nuTarifaDif = object.nuPrecio;
			if($scope.vovoContrat.nuTarifa != null && $scope.vovoContrat.nuTarifaDif){
				$scope.vovoContrat.nuSubtotal = "$ 9,700.00";
				$scope.vovoContrat.nuTotal = "$ 10,300.00";
			}
		}else{
			$scope.vovoContrat.nuTarifaDif = undefined;
		}*/
	};
	
	
	function calculateAndDisplayRoute(directionsService, directionsDisplay,start,end) {
        directionsService.route({
          origin: start,
          destination: end,
          //optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };
      
      var directionsService;
      var directionsDisplay;
      var map;
      
      function cargarMapa(maps) {
    	  directionsService = new google.maps.DirectionsService;
    	  directionsDisplay = new google.maps.DirectionsRenderer({
      	   polylineOptions: {strokeColor: "green"}
      	 });
    	  map = new google.maps.Map(document.getElementById(maps), {
            zoom: 5,
            center: {lat: 19.301919, lng: -99.189884}
          });
    	  directionsDisplay.setMap(map);
        };
        cargarMapa("map");
        
        $scope.cambiosRuta = function (object){
    		if(object != null){
    			$scope.transporteHabilitado = false;
    			//$scope.vovoContrat.nuTarifa = object.nuPrecioRuta;
    			$scope.vovoContrat.nbOrigen = object.nbOrigen;
    			$scope.vovoContrat.nbDestino = object.nbDestino;
    			$scope.vovoContrat.nuTarifaDif = undefined;
    			//var start = newValue.originalObject.lat+','+newValue.originalObject.lng;
    			var start = object.latOrigen+','+object.lngOrigen;
    			var end = object.latDestino+','+object.lngDestino;
    			if(start!= null && end != null){
    				calculateAndDisplayRoute(directionsService, directionsDisplay,start,end)
    			}
    		}else{
    			$scope.transporteHabilitado = true;
    			$scope.vovoContrat.nuTarifa = undefined;
    			$scope.vovoContrat.nbOrigen = undefined;
    			$scope.vovoContrat.nbDestino = undefined;
    			$scope.vovoContrat.nuTarifaDif = undefined;
    			$scope.vovoContrat.nuTarifaDif = undefined;
    		}
    		$scope.vovoContrat.nuSubtotal = undefined;
			$scope.vovoContrat.nuTotal = undefined;
			$scope.vovoContrat.nuTarifa = undefined;
    		$('#select2-nbTipoTransporte-container').text("Seleccione una opción");
    	};
        
    	$scope.cambioProveedor = function (proveedor){
    		directionsDisplay.setDirections({routes: []});
    		$scope.idSolicitud = null;
    		if(proveedor == null){
    			$scope.rutaHabilitada = true;
    		}else{
    			$scope.rutaHabilitada = false;
    		}
    		$('#select2-nbTipoTransporte-container').text("Seleccione una opción");
    		$('#select2-nbRuta-container').text("Seleccione una opción");
    		$scope.transporteHabilitado = true;
    		$scope.vovoContrat.nuTarifa = undefined;
    		$scope.vovoContrat.nbOrigen = undefined;
    		$scope.vovoContrat.nbDestino = undefined;
    		$scope.vovoContrat.nuTarifaDif = undefined;
    		$scope.vovoContrat.nuSubtotal = undefined;
			$scope.vovoContrat.nuTotal = undefined;
    	};
    	
    	$scope.ivaChnage = function (valor){
    		if(valor){
    			$scope.vovoContrat.nuSubtotal = "$ 9,900.00";
				$scope.vovoContrat.nuTotal = "$ 10,600.00";
    		}else{
    			$scope.vovoContrat.nuSubtotal = "$ 9,700.00";
				$scope.vovoContrat.nuTotal = "$ 10,300.00";
    		}
    		
    	};
    	
    	$scope.guardarServicios = function (){
    		console.log(seguimientoServices.getCotizada());
//    		growl.success($scope.mensajeModal('Registro guardado correctamente'),
//    				{title: $scope.mensajeModal('¡Éxito!')});
    		showAlert.aviso("Registro guardado correctamente", null);
    	};
    	
    	if(idSolicitud != null){
    		idSolicitud =  parseInt(idSolicitud);
    		seguimientoServices.getSeguimientos().success(function(data) {
    			angular.copy(data.solicitudes,$scope.solicitudes);
    			if($scope.solicitudes.length > 0){
    				for(var i=0; i < $scope.solicitudes.length; i++){
    					if(idSolicitud === $scope.solicitudes[i].id){
    						console.log($scope.solicitudes[i]);
    						angular.copy($scope.solicitudes[i],$scope.objectSolicitud);
    						break;
    					}
    				}
    				if($scope.objectSolicitud != null){
    					if($scope.objectSolicitud.contratada){
    						$scope.deshabilitaCombo = true;
    						//alert($scope.objectSolicitud.nbRuta);
    						//console.log($scope.objectSolicitud);
    						//$("#select2-nbRuta1-container").text($scope.objectSolicitud.nbRuta);
    					}
    					$scope.vovoContrat.nbRuta1 = $scope.objectSolicitud.nbRuta;
    					$scope.vovoContrat.nbTipoTransporte =  $scope.objectSolicitud.camion[0].nbTipoCamion;
    					$scope.vovoContrat.nuTarifa = $scope.objectSolicitud.nuPrecio;
    					$scope.vovoContrat.nbOrigen = $scope.objectSolicitud.origen.nbUbicacion;
    					$scope.vovoContrat.nbDestino = $scope.objectSolicitud.destino.nbUbicacion;
    					$scope.vovoContrat.fhLlegada = $scope.objectSolicitud.fhentrega;
    					$scope.vovoContrat.nuSubtotal = "$ 9,700.00";
    					$scope.vovoContrat.nuTotal = "$ 10,300.00";
    					
    					if($scope.objectSolicitud.origen.lat != undefined && $scope.objectSolicitud.origen.lng != undefined
    							&& $scope.objectSolicitud.destino.lat != undefined && $scope.objectSolicitud.destino.lng != undefined){
    						var start = $scope.objectSolicitud.origen.lat +","+$scope.objectSolicitud.origen.lng;
        					var end = $scope.objectSolicitud.destino.lat +","+$scope.objectSolicitud.destino.lng;
        					calculateAndDisplayRoute(directionsService, directionsDisplay,start,end)
    					}
    						//calculateAndDisplayRoute(directionsService, directionsDisplay,start,end)
    				}
    			}
    		}).error(function(data){});
    	}
});
	
