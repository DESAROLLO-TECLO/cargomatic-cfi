angular.module(appTeclo).
controller('rutasController', function($scope, $filter, $timeout, $interval, growl, $controller, $q, $window, cotizacionesService, rutasService, $compile) {
	
	$scope.searchVO = {};
	$scope.vo = {};
	$scope.subcategoriaFiltrada = [];
	$scope.showModal = false;
	$scope.transportes = [];
	$scope.formRoute = {};
	
	$scope.viewForm = {mostrarMapa : true, colForm: 'col-md-4', colMapa : 'col-md-8', icon:'fa fa-chevron-left'};
	
	$scope.collapsar = function(){
		if($scope.viewForm.mostrarMapa){
			$scope.viewForm.colForm = 'hide';
			$scope.viewForm.colMapa = 'col-md-12';
			$scope.viewForm.icon = 'fa fa-chevron-right';
		}else{
			$scope.viewForm.colForm = 'col-md-4';
			$scope.viewForm.colMapa = 'col-md-8';
			$scope.viewForm.icon = 'fa fa-chevron-left';
		}
		
		$scope.viewForm.mostrarMapa = !$scope.viewForm.mostrarMapa;
	}
	
	$scope.originalFormat={
		categorias : [],
		subCategorias : [],
		provedor : [],
		tiposTransporte : [],
		orig : {},
		dest: {}
	}
	
	$scope.reset = function(){
		$scope.formRoute = angular.copy($scope.originalFormat);
	}
	
	$scope.setLoad = function(ruta){
		$scope.load = ruta.carga;
		$scope.invoice = ruta.datosFacturacionProvedor;
	}
	
	$scope.obtenerDatosCotiza = function (){
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			//console.log(data);
			angular.copy(data,$scope.vo);
		}
		);
	};
	$scope.obtenerDatosCotiza();
	
	$scope.filtroSubcategoria = function (categoria, subcategoria){
		$scope.subcategoriaFiltrada = [];
		if(subcategoria.length > 0){
			for(var i in subcategoria){
				if(categoria.id === subcategoria[i].idPadre){
					$scope.subcategoriaFiltrada.push(subcategoria[i]);
				}
			}
		}
	};
	
	$scope.filtraSubcategoria = function (list){
		$scope.subcategoriasFiltro = [];
		if($scope.vo.subcategoria.length > 0){
			for(var i in $scope.vo.subcategoria){
				for(var j in list){
					if(list[j].id === $scope.vo.subcategoria[i].idPadre){
						$scope.subcategoriasFiltro.push(
							{
								"idOpcion": $scope.vo.subcategoria[i].id,
								nbGroup : list[j].nbCategoria,
								"nbOpcion" : $scope.vo.subcategoria[i].nbSubCategoria
							}
						);
					}
				}
			}
		}
	}
	
	$scope.searchRoutes = function(){
		$scope.initMap();
		rutasService.obtenerRutasInventario().success(function(rutasSet){
			$scope.rutasSet = angular.copy(rutasSet.rutas);
			$scope.rutass = angular.copy(rutasSet.rutas);
//			$scope.setContent(0);
			$scope.mapaFunctionsSet(0)
		});
	}
	
	$scope.viewModal = function(ruta){
		$scope.showModal = true;
		$scope.proveedores = ruta.proveedores;
	}
	
	/*
	 * 
	 * 
	 * 
	 * 
	 */
	

	$scope.mapaFunctionsSet = function(idd){
		if(idd==5) return;
		var x = 0;
		id = idd + 1;
		for(x in $scope.rutass){
			if (id == $scope.rutass[x].idRuta) {
				//$scope.clearRoutes($scope.rutass[x],true);
				$scope.rutass[x].allMarkers = [];
				$scope.rutass[x].shownRoute = true;
				break;
			}
		}
		contents = [];
		for(var y in $scope.rutass[x].eventos){
			
			content ={
					ruta : $scope.rutass[x].eventos[0].descripcionOrigen + " - " + $scope.rutass[x].eventos[0].descripcionLocalidad,
					lat : parseFloat($scope.rutass[x].eventos[y].latitudGps),
					lng : parseFloat($scope.rutass[x].eventos[y].longitudGps),
					descripcionOrigen : ($scope.rutass[x].eventos[y].descripcionOrigen),
					descripcionLocalidad : ($scope.rutass[x].eventos[y].descripcionLocalidad),
					descripcionEvento : ($scope.rutass[x].eventos[y].descripcionEvento),
					fechaCoordenada : $scope.rutass[x].eventos[y].fechaEvento,
					shownRoute : $scope.rutass[x].eventos[y].shownRoute,
					puntoActual : $scope.rutass[x].eventos[y].puntoActual,
					puntoInicial : $scope.rutass[x].eventos[y].puntoInicial,
					puntoFinal : $scope.rutass[x].eventos[y].puntoFinal,
					puntoActual : $scope.rutass[x].eventos[y].puntoActual,
					fillCollor : $scope.rutass[x].eventos[y].fillCollor,
					routeColor : $scope.rutass[x].eventos[y].routeColor,
//					indicador : $scope.rutass[x].indicador,
//					mainObject: mainObject,
//					principalInfoWindow : true,

//					coordenadas : $scope.rutass[x].coordenadas,
					index : $scope.rutass[x].eventos.length == 1 ? -1 : y
			}
			if(y==0)content.startPoint = true;
			$scope.rutass[x].allMarkers.push($scope.addMarkers(content, y, x));
			contents.push(content);
		}
		$scope.routePrototype2(contents, id, x, $scope.rutass[x].eventos[0].strokeColor);
		$scope.mapaFunctionsSet(idd+1);
	}
	
	$scope.directionsService = new google.maps.DirectionsService;
	$scope.routePrototype2 = function(contents, id, x, sstrokeColor){
		
		   
//		   var lngs = contents.map(function(station) { return station.lng; });
//		   var lats = contents.map(function(station) { return station.lat; });
		   var lineSymbol = {
	 			  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	 			};
//		   $scope.gMap.fitBounds({
//		       west: Math.min.apply(null, lngs),
//		       east: Math.max.apply(null, lngs),
//		       north: Math.min.apply(null, lats),
//		       south: Math.max.apply(null, lats),
//		   });
//		   rndColor = '#'+Math.floor(Math.random()*16777215).toString(16);
//		   done = strokeColor;
		   yet = '#ff3300';
//		   for (var i = 0, parts = [], max = 25 - 1; i < contents.length; i = i + max)
//		        parts.push(contents.slice(i, i + max + 1));

		    // Callback function to process service results
		    var service_callback = function(response, status) {
		        if (status != 'OK') {
		        	
		          //  console.log('Directions request failed due to ' + status);
		            return;
		        }
		        var renderer = new google.maps.DirectionsRenderer({
		            polylineOptions: {
		                strokeColor: sstrokeColor,
		                icons: [{
//				            icon: lineSymbol,
				            offset: '100%',
				            repeat: '40px'
				          }]
		              }
		            });
		        renderer.setMap($scope.gMap);
		        renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
		        renderer.setDirections(response);
		        $scope.rutass[x].renderers.push(renderer);
		        
//		        $scope.mapaFunctionsSet(++id);
		        
		    };
		    $scope.rutass[x].renderers = [];
		    var service_options = {
		            origin: contents[0],
		            destination: contents[1],
//		            waypoints: waypoints,
		            optimizeWaypoints:false,
		            travelMode: 'DRIVING'
		        };
		       $scope.directionsService.route(service_options, service_callback);
	   }
	
	$scope.addMarkers = function(content, y, x) {
		if(content.startPoint){
			 $scope.rutass[x].infoWindows = [];
		 }
		
		var coordenadas = {
            lat: content.lat,
            lng: content.lng
        };
		if(content.puntoInicial==1 || content.puntoFinal==1){
			var icon = {
    		        path: 'M24.5,1c7.3,0,13.1,5.8,13.1,13c0,9.8-13.1,24.2-13.1,24.2S11.4,23.8,11.4,14C11.4,6.8,17.3,1,24.5,1 M24.5,9.8'+
    		        'c-2.4,0-4.4,2-4.4,4.4s2,4.4,4.4,4.4s4.4-2,4.4-4.4S26.9,9.8,24.5,9.8 M42,38.2c0,4.8-7.8,8.8-17.5,8.8S7,43.1,7,38.2'+
    		        'c0-2.8,2.7-5.3,6.8-6.9l1.4,2c-2.4,1-3.8,2.3-3.8,3.9c0,3,5.9,5.5,13.1,5.5s13.1-2.5,13.1-5.5c0-1.5-1.5-2.9-3.8-3.9l1.4-2'+
    		        'C39.4,32.9,42,35.4,42,38.2z',
            		fillOpacity: 1,
    		        scale: 1,
    		        width :100, 
    		        fillColor: content.fillCollor,//content.indicador.indicadorCodigo,
    		        strokeColor: content.routeColor,
    		        strokeWeight: 2,
    		        scaledSize: new google.maps.Size(40, 40), // scaled size
    		        origin: new google.maps.Point(0, 0), // origin
    		        anchor: new google.maps.Point(25, 38)
    		   };
            var marker = new google.maps.Marker({
                position: coordenadas,
                map: $scope.gMap,
                draggable: false,
                icon : icon,
                animation: google.maps.Animation.DROP
            });
		}
		google.maps.event.addListener(marker, 'click', (function (marker) { return function () {
            	var geocoder = new google.maps.Geocoder;
            	
	            geocoder.geocode({
	                'location': coordenadas
	            }, function(results, status) {
	                if (status === 'OK')
	                    address = results;
	                content.direccion = results[1].formatted_address
	                $scope.openInfoWindow($scope.gMap, marker, content, x, y);
	            });
            }
        })(marker));
		return marker;
	}
	
	$scope.openInfoWindow = function(map, marker, content, x, y) {
		 if($scope.rutass[x].infoWindows[y] == null || $scope.rutass[x].infoWindows[y] == undefined){
			 $scope.rutass[x].infoWindows[y] = new google.maps.InfoWindow;
		 }else{
			 if(!isInfoWindowOpen($scope.rutass[x].infoWindows[y]))
				 $scope.rutass[x].infoWindows[y].open(map, marker);
			return;
		 }
		 var markerLatLng = marker.getPosition();
       
		 var proveedores = '<table class="table table-striped table-hover header-fixed"><tr><th class="center">Proveedores</th><th class="center">Tipo de Vehículo</th></tr>';
		 for(var y1 in $scope.rutass[x].proveedores){
			 proveedores += '<tr>'+'<td>'+$scope.rutass[x].proveedores[y1].nbProveedor+'</td><td>';
			 for(var z in $scope.rutass[x].proveedores[y1].vehiculos){
				 proveedores += $scope.rutass[x].proveedores[y1].vehiculos[z].nbTipoCamion + 
				 ((z == $scope.rutass[x].proveedores[y1].vehiculos[z].length - 1) ? '':  ', ');
			 }
			 proveedores +='</td></tr>';
		 }
		 proveedores += '<table>'
		 $scope.rutass[x].infoWindows[content.index].setContent([
		   '<div style="text-align:center;">',
		   '<br/><strong>Ruta: </strong>',
           content.ruta,
           proveedores,
       		'</div>'
           ].join(''));
		 
		 $scope.rutass[x].infoWindows[y].open(map, marker);
	}
	
	$scope.clearRoutes = function(route,hideFirsMarker){
		for(var x in route.renderers){
			route.renderers[x].setMap(null);
		}
		for(var x in route.allMarkers){
			route.allMarkers[x].setMap(null);
		}
		if(route.road!=undefined)
			route.road.setMap(null);
//		hideFirsMarker || route.firstMarker[0] != undefined ? route.firstMarker[0].setMap(null) : route.firstMarker[0].setMap($scope.gMap);
		if( route.firstInfoWindow != null && route.firstInfoWindow != undefined)
			route.firstInfoWindow.close();
	}
	
	function isInfoWindowOpen(infoWindow){
	    var map = infoWindow.getMap();
	    return (map !== null && typeof map !== "undefined");
	}

	$scope.gMap = null;
	var cdmx = {
	        lat: 19.374610,
	        lng:  -99.083722
	    };
	 $scope.initMap = function() {
		 var options = {
			center: cdmx,
	     	zoom: 5,
	     	mapTypeId: google.maps.MapTypeId.ROADMAP,
	     	gestureHandling:'greedy'
		 }
		 mapInstancesPool.reset();
		 $scope.gMap = mapInstancesPool.getInstance('map1',options).map;
		 this.places = new google.maps.places.PlacesService($scope.gMap);
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
	}
	$scope.initMap();
	
	$scope.changeOrigen = function (objOrigen){
  		if(objOrigen != null && $scope.formRoute.destino != undefined){
  			//var start = objOrigen.lat +","+objOrigen.lng;
			//var end = $scope.formRoute.destino.lat +","+$scope.formRoute.destino.lng;
			//calculateAndDisplayRoute(start,end);
  		}
  	};
  	$scope.changeDestino = function (objDestino){
  		if(objDestino != null && $scope.formRoute.origen != undefined){
  			//var start =$scope.formRoute.origen.lat +","+$scope.formRoute.origen.lng;
			//var end = objDestino.lat +","+objDestino.lng;
			//calculateAndDisplayRoute(start,end);
  		}
  	};
	
});