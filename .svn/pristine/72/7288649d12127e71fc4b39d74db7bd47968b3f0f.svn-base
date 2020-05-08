angular.module(appTeclo).controller('cotizacionesController',function ($scope, $filter,growl,showAlert,blockUI,$location,cotizacionesService, seguimientoServices, object){
	
	
	$scope.flag = angular.isDefined(object);
	$scope.vo = {};
	$scope.voAux = {};
	$scope.subcategoriaFiltrada = [];
	$scope.subcategoriasFiltro = [];
	$scope.subcategorias = [];
	$scope.completeObject = {};
	
	$scope.origenObject =null;
	$scope.destinoObject =null;
	
	$scope.obtenerDatosCotiza = function () {
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			angular.copy(data,$scope.vo);
			$scope.vo.nbCategoria = [];
			$scope.vo.subcategories = [];
			$scope.vo.nbEmpaquetado = "";
			$scope.vo.nbTipoTransporte = [];
			$scope.vo.stApilable = "false";
			$scope.vo.stMontacargas = "false";
			$scope.vo.nuAncho = 0;
			$scope.vo.nuAlto = 0;
			$scope.vo.nuLargo = 0;
			$scope.vo.nbUnidadMed = "";
			$scope.vo.nbUnidadMedPes = "";
			$scope.vo.nuPesoArt = 0;
			$scope.vo.nuValor = "";
			$scope.vo.nbOrigen = {};
			$scope.vo.nbDestino = {};
			angular.copy(data,$scope.voAux);
			angular.copy($scope.vo.subcategoria, $scope.subcategorias);
		}
		);
	};
	$scope.obtenerDatosCotiza();
	
	
	$scope.filtroSubcategoria = function (idPadre){
		$scope.subcategoriaFiltrada = [];
		if($scope.subcategorias.length > 0){
			for(var i in $scope.subcategorias){
				if(idPadre === $scope.subcategorias[i].idPadre){
					$scope.subcategoriaFiltrada.push(subcategoria[i]);
				}
			}
		}
	};
	
	$scope.guardarCotizacion = function (vo){
//		growl.success($scope.mensajeModal('Registro guardado correctamente'), {title: $scope.mensajeModal('¡Éxito!')});
		showAlert.aviso("Registro guardado correctamente", null);
		
		if($scope.flag){
			$scope.completeObject.statusCod = "02";
			$scope.completeObject.statusCodLetra = "EC";
			$scope.completeObject.status = "En Cotización";
			$scope.completeObject.label = "label-warning";
			$scope.completeObject.labelAction = "Finalizar Cotización";
			$scope.completeObject.action = "002";
			
			seguimientoServices.setCotizada($scope.completeObject);
		}
	};
	
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
			$scope.gMap = mapInstancesPool.getInstance('map5',options).map;
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
  					if(list[j] == $scope.subcategorias[i].idPadre){
  						$scope.subcategoriasFiltro.push(
  							{
  								"idOpcion": $scope.subcategorias[i].id,
  								 nbGroup : searchNameCategory(list[j]), //list[j].nbCategoria,
  								"nbOpcion" : $scope.subcategorias[i].nbSubCategoria
  							}
  						);
  					}
  				}
  				
  			}
  		}
  	}
  	
  	searchNameCategory = function(id){
  		for(var x in $scope.vo.categoria){
  			if(id == $scope.vo.categoria[x].id){
  				return $scope.vo.categoria[x].nbCategoria;
  			}
  		}
  	}
  	
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
  	
  	loadData = function(){
  		//$scope.directionsDisplay.setDirections({routes: []});
  		if(angular.isDefined(object)){
  			seguimientoServices.getSeguimientos().success(function(data) {
  				for(var i in data.solicitudes){
  					if(data.solicitudes[i].id == object){
  						for(var cate in data.solicitudes[i].categoria){
  							$scope.vo.nbCategoria.push(data.solicitudes[i].categoria[cate].id);
  							//$scope.vo.nbCategoria = data.solicitudes[i].categoria;
  						}
  						for(var subcate in data.solicitudes[i].subcategoria){
  							$scope.vo.subcategories.push(data.solicitudes[i].subcategoria[subcate].id);
  							//$scope.vo.subcategories = data.solicitudes[i].subcategoria;
  						}
  						$scope.filtraSubcategoria($scope.vo.nbCategoria);
  						
						$scope.vo.nbEmpaquetado = data.solicitudes[i].empaquetado.nbEmpaquetado; 
  						
						for(var vehi in data.solicitudes[i].camion){
							$scope.vo.nbTipoTransporte.push(data.solicitudes[i].camion[vehi].id)
						}
  						
						$scope.vo.stApilable = data.solicitudes[i].apilable;
						$scope.vo.stMontacargas = data.solicitudes[i].montacargas;
						$scope.vo.nuAncho = data.solicitudes[i].ancho;
						$scope.vo.nuAlto = data.solicitudes[i].alto;
						$scope.vo.nuLargo = data.solicitudes[i].largo;;
						$scope.vo.nbUnidadMed = data.solicitudes[i].uni1;
						$scope.vo.nbUnidadMedPes = data.solicitudes[i].uni2;
						$scope.vo.nuPesoArt = data.solicitudes[i].pesoArt;
						$scope.vo.nuValor = data.solicitudes[i].valorArt;
						
						$scope.vo.nbOrigen = data.solicitudes[i].origen.id;
						$scope.vo.nbDestino = data.solicitudes[i].destino.id;
						$scope.completeObject = data.solicitudes[i];
						
						if($scope.vo.nbOrigen != null && $scope.vo.nbDestino){
							var start = data.solicitudes[i].origen.lat +","+data.solicitudes[i].origen.lng;
        					var end = data.solicitudes[i].destino.lat +","+data.solicitudes[i].destino.lng;
        					calculateAndDisplayRoute(start,end);
						}
						
  						break;
  					}
  				} 				
  			}).error(function(data) {
				
  			});
  			
  			
  		}
  	}
  	loadData();
  	
  	
  	$scope.changeOrigen = function (objOrigen){
  		if(objOrigen != null && $scope.vo.nbDestino.id != undefined){
  			var start = objOrigen.lat +","+objOrigen.lng;
			var end = $scope.vo.nbDestino.lat +","+$scope.vo.nbDestino.lng;
			calculateAndDisplayRoute(start,end);
  		}
  	};
  	$scope.changeDestino = function (objDestino){
  		if(objDestino != null && $scope.vo.nbOrigen.id != undefined){
  			var start = $scope.vo.nbOrigen.lat +","+$scope.vo.nbOrigen.lng;
			var end = objDestino.lat +","+objDestino.lng;
			calculateAndDisplayRoute(start,end);
  		}
  	};
});
	