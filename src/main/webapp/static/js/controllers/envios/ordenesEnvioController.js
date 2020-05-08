angular.module(appTeclo).controller('ordenesEnvioController',function ($scope, $filter,growl,showAlert,blockUI,$location,ordenesEnvioService,cotizacionesService){

	$scope.envio = {};
	$scope.vo = {};
	$scope.subcategoriasFiltro = [];
	$scope.subcategorias = [];
	$scope.showModal = false;
	$scope.object = {};//{co:'Confirmación ',de:'de ',us:'Guardado'};
	
	$scope.obtenerDatosEnvio = function (){
		ordenesEnvioService.obtenerEnvios().success(function(data) {
			angular.copy(data,$scope.envio);
		});
	};
	$scope.obtenerDatosCotiza = function (){
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			angular.copy(data,$scope.vo);
			angular.copy($scope.vo.subcategoria, $scope.subcategorias);
		});
	};
	
	$scope.obtenerDatosEnvio();
	$scope.obtenerDatosCotiza();
	
	
	$scope.gMap = null;
	var cdmx = {
	        lat: 19.374610,
	        lng:  -99.083722
	    };
	
	$scope.cargarMapa = function() {
			var options = {
				center : cdmx,
				zoom : 5,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				gestureHandling : 'greedy'
			};
			mapInstancesPool.reset();
			$scope.gMap = mapInstancesPool.getInstance('map8',options).map;
			this.places = new google.maps.places.PlacesService($scope.gMap);

		$scope.$watch('origenObject',function(newValue,oldValue){
			if(newValue != null){
    			var latLng = new google.maps.LatLng(newValue.originalObject.lat,newValue.originalObject.lng);
    			$scope.pintarMarker($scope.gMap,latLng,newValue.originalObject.nbUbicacion);
    		}
    		if(newValue != null && $scope.destinoObject != null){
    			var start = newValue.originalObject.lat+','+newValue.originalObject.lng;
    			var end = $scope.destinoObject.originalObject.lat+','+$scope.destinoObject.originalObject.lng;
    			calculateAndDisplayRoute(start,end);
    			
    		}
    	});
		
		$scope.$watch('destinoObject',function(newValue,oldValue){
			if(newValue != null){
    			var latLng = new google.maps.LatLng(newValue.originalObject.lat,newValue.originalObject.lng);
    			$scope.pintarMarker($scope.gMap,latLng,newValue.originalObject.nbUbicacion);
    		}
			if(newValue != null && $scope.origenObject != null){
    			var start = newValue.originalObject.lat+','+newValue.originalObject.lng;
    			var end = $scope.origenObject.originalObject.lat+','+$scope.origenObject.originalObject.lng;
    			calculateAndDisplayRoute(start,end);
    			
    		}
    	});
		};
      
      
	
	function calculateAndDisplayRoute(start,end) {
		
		$scope.directionsService = new google.maps.DirectionsService;
		$scope.directionsDisplay = new google.maps.DirectionsRenderer({
	    	   polylineOptions: {strokeColor: "green"}
	    	 });
		$scope.directionsDisplay.setMap($scope.gMap);
		
		
		$scope.directionsService.route({
          origin: start,
          destination: end,
          //optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
        	  $scope.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };
      
      
      $scope.pintarMarker = function(map, latYlng, nbruta){
    	  var marker = new google.maps.Marker({
    		    position: latYlng,
    		    map: map,
    		    title: nbruta
    		  });
    	  return marker;
      };
	
      $scope.filtraSubcategoria = function (list){
  		$scope.subcategoriasFiltro = [];
  		if($scope.subcategorias.length > 0){
  			for(var i in $scope.subcategorias){
  				for(var j in list){
  					if(list[j].id === $scope.subcategorias[i].idPadre){
  						$scope.subcategoriasFiltro.push(
  							{
  								"idOpcion": $scope.subcategorias[i].id,
  								 nbGroup : list[j].nbCategoria,
  								"nbOpcion" : $scope.subcategorias[i].nbSubCategoria
  							}
  						);
  					}
  				}
  				
  			}
  		}
  	};
  	
  	var mapInstancesPool = {
  		   	pool: [],
  		   	used: 0,
  		   	getInstance: function(idd, options){
  		    	if(mapInstancesPool.used >= mapInstancesPool.pool.length){
  		    		mapInstancesPool.used++;
  		    		mapInstancesPool.pool.push (mapInstancesPool.createNewInstance(idd, options));
  		    	} else { 
  		    	    mapInstancesPool.used++;
  		    	}
  		    	return mapInstancesPool.pool[mapInstancesPool.used-1];
  		   	},
  		   	reset: function(){
  		   		mapInstancesPool.used = 0;
  		   		mapInstancesPool.pool = [];
  		   	},
  		   	createNewInstance: function(idd, options){
  		   		var map = new google.maps.Map(document.getElementById(idd), options);
  			        return {
  			            map: map
  			        }
  		   	}
  		};
  	$scope.cargarMapa();
  	
  	
  	$scope.verProvedoresSugeridos = function(){
  		//$(".rating").rating();
  		angular.element(".rating").rating();
		/*$("#input-2").rating();
		$("#input-3").rating();
		$("#input-4").rating();
		$("#input-5").rating();*/
  		$scope.showModal = true;
  	};
  	
  	$scope.asignarProvSegerido = function (object){
  		$scope.object = {'id':object};
  		$scope.mostrarModalNoti();
  	};
  	
  	 $scope.mostrarModalNoti = function (){
     	showAlert.confirmacion("¿Desea asociar a este proveedor?", confirmacionFinal, $scope.object, cancelarFinal);
     	//growl.success('Se enviaron las notificaciones a todos los inspectores.',{title:'¡Éxito!', ttl:2000});
     };
  	
  	confirmacionFinal = function(o) {
		if(growl.success){
			if(o.id != null){
	  			for(var i=0; i< $scope.envio.proveedor.length; i++){
	  				if($scope.envio.proveedor[i].id == o.id){
	  					$('#select2-nbProveedor-container').text($scope.envio.proveedor[i].nbProveedor);
	  					break;
	  				}
	  			}
	  		}
			$scope.showModal = false;
			
		}
	};
	cancelarFinal = function(){
		$scope.showModal = true;
	};
	
	$scope.guardarEnvio = function (){
		growl.success($scope.mensajeModal('Registro guardado correctamente'),
				{title: $scope.mensajeModal('¡Éxito!')});
	};
      
});
	