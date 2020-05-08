angular.module(appTeclo).
controller('monitoreoRutaController', function($scope, $filter, monitoreoId, $timeout, $interval, growl, $controller, $q, $window, cotizacionesService, rutasService, $compile) {

	var rutaIdRouteConfig = monitoreoId;
	$scope.searchOperacion = function(idOperacion){
		rutasService.monitoreo()
		.success(function(data){
			$scope.rutass = data;
			$scope.mapaFunctionsSet(rutaIdRouteConfig);
		})
		.error(function(){
			
		})
	}
	
	$scope.searchRoutes = function(){
		rutasService.obtenerRutas().success(function(rutasSet){
			$scope.rutasSet = rutasSet;
			$scope.setLoad(rutaIdRouteConfig);
		});
	}
	
	$scope.setLoad = function(rutaId){
		if (rutaIdRouteConfig== -1)
			return;
		for(var x in $scope.rutasSet){
			if(rutaId == $scope.rutasSet[x].rutaId){
				ruta = $scope.rutasSet[x];
				$scope.rutaPerfecta= ruta;
				break;
			}
		}
		$scope.load = ruta.carga;
		$scope.totales = {peso:0, dimen:0, carga:0, volumen:0};
		for(var x in $scope.load){
			$scope.totales.peso = $scope.totales.peso + parseInt($scope.load[x].peso);
			$scope.totales.dimen = $scope.totales.dimen + parseInt($scope.load[x].dimension);
			$scope.totales.carga = $scope.totales.carga + parseInt($scope.load[x].porcentajeOcupacionCarga);
			$scope.totales.volumen = $scope.totales.volumen + parseInt($scope.load[x].porcentajeOcupacionVolumen);
		}
		
		$scope.totales.peso += 'Kg';
		$scope.totales.dimen += 'm3';
		$scope.totales.carga += '%';
		$scope.totales.volumen += '%';
		
		$scope.invoice = ruta.datosFacturacionProvedor;
	}
	
	$scope.searchRoutes();
	
$scope.viewForm = {mostrarMapa : true, colForm: 'col-md-8', colMapa : 'col-md-4', icon:'fa fa-chevron-left'};
	
	$scope.collapsar = function(){
		if($scope.viewForm.mostrarMapa){
			$scope.viewForm.colForm = 'hide';
			$scope.viewForm.colMapa = 'col-md-12';
			$scope.viewForm.icon = 'fa fa-chevron-right';
		}else{
			$scope.viewForm.colForm = 'col-md-8';
			$scope.viewForm.colMapa = 'col-md-4';
			$scope.viewForm.icon = 'fa fa-chevron-left';
		}
		
		$scope.viewForm.mostrarMapa = !$scope.viewForm.mostrarMapa;
	}

	//___________INICIA LOGICA MAPA_____________
	
	
	
	
	$scope.mapaFunctionsSet = function(id){
		var x = 0;
		for(x in $scope.rutass){
			if (id == $scope.rutass[x].idRuta) {
				$scope.rutass[x].firstMarker = [];
				$scope.clearRoutes($scope.rutass[x],true);
				$scope.rutass[x].allMarkers = [];
				$scope.rutass[x].shownRoute = true;
				break;
			}
		}
		contents = [];
		for(var y in $scope.rutass[x].eventos){
			
			content ={
					ruta : $scope.rutass[x].origen + " - " + $scope.rutass[x].destino,
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
//					indicador : $scope.rutass[x].indicador,
//					mainObject: mainObject,
//					principalInfoWindow : true,

					coordenadas : $scope.rutass[x].coordenadas,
					index : $scope.rutass[x].eventos.length == 1 ? -1 : y
			}
			if(y==0)content.startPoint = true;
			$scope.rutass[x].allMarkers.push($scope.addMarkers(content, y, x));
			contents.push(content);
		}
		$scope.routePrototype2(contents, rutaIdRouteConfig, x)
		
	}
	
	$scope.routePrototype2 = function(contents, id, x){

		   $scope.directionsService = new google.maps.DirectionsService;
		   var lngs = contents.map(function(station) { return station.lng; });
		   var lats = contents.map(function(station) { return station.lat; });
		   var lineSymbol = {
	 			  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	 			};
		   $scope.gMap.fitBounds({
		       west: Math.min.apply(null, lngs),
		       east: Math.max.apply(null, lngs),
		       north: Math.min.apply(null, lats),
		       south: Math.max.apply(null, lats),
		   });
//		   rndColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		   done = '#33ccff';
		   yet = '#ff3300';
		   for (var i = 0, parts = [], max = 25 - 1; i < contents.length; i = i + max)
		        parts.push(contents.slice(i, i + max + 1));

		    // Callback function to process service results
		    var service_callback = function(response, status) {
		        if (status != 'OK') {
		            console.log('Directions request failed due to ' + status);
		            return;
		        }
		        var renderer = new google.maps.DirectionsRenderer({
		            polylineOptions: {
		                strokeColor: done,
		                icons: [{
				            icon: lineSymbol,
				            offset: '100%',
				            repeat: '40px'
				          }]
		              }
		            });
		        renderer.setMap($scope.gMap);
		        renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
		        renderer.setDirections(response);
		        $scope.rutass[x].renderers.push(renderer);
		    };
		    $scope.rutass[x].renderers = [];
		    for (var i = 0; i < parts.length; i++) {
		        var waypoints = [];
		        for (var j = 1; j < parts[i].length - 1; j++)
		            waypoints.push({location: parts[i][j], stopover: true});
		        var service_options = {
		            origin: parts[i][0],
		            destination: parts[i][parts[i].length - 1],
		            waypoints: waypoints,
		            optimizeWaypoints:false,
		            travelMode: 'DRIVING'
		        };
		        $scope.directionsService.route(service_options, service_callback);
		    }
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
    		        fillColor: (content.puntoInicial == 1 ? '#339966'  : '#ff3300'),//content.indicador.indicadorCodigo,
    		        strokeColor: (content.puntoInicial == 1 ? '#00cc99' : '#e60000'),
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
		}else if(content.puntoActual==1){
        	var icon = {
    		        path : 'M190.3,135.7L186,131c-0.2-0.2-0.5-0.4-0.9-0.4h-5.4v16.7h2.5c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9h2.5'
    		        	+'v-10.8C190.6,136.2,190.5,135.9,190.3,135.7'
    		        	+'M179.8,141.4h-17.7v-12.3c0-0.8,0.6-1.4,1.4-1.4h14.9c0.8,0,1.4,0.6,1.4,1.4L179.8,141.4L179.8,141.4z'
    		        	+'M182.6,138.5h8v-2c0-0.3-0.1-0.6-0.3-0.8l-2.8-3.1h-4.9c-0.2,0-0.4,0.2-0.4,0.4v5.2'
    		        	+'C182.2,138.3,182.4,138.5,182.6,138.5'
    		        	+'M188.1,147.3c0,1.6-1.3,2.9-2.9,2.9s-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9S188.1,145.7,188.1,147.3'
    		        	+'M170.4,147.3c0,1.6-1.3,2.9-2.9,2.9c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9'
    		        	+'C169.1,144.3,170.4,145.7,170.4,147.3'
    		        	+'M162.1,141.4v4.7c0,0.7,0.5,1.2,1.2,1.2h1.2c0-1.6,1.3-2.9,2.9-2.9c1.6,0,2.9,1.3,2.9,2.9h9.3v-5.9H162.1z'
    		        	+'M168.5,147.3c0,0.5-0.4,1-1,1c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1C168,146.3,168.5,146.8,168.5,147.3'
    		        	+'M186.2,147.3c0,0.5-0.4,1-1,1c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1C185.7,146.3,186.2,146.8,186.2,147.3'
    		        	+'M190.6,141.4h-2.9c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h2.9V141.4z'
    		        	+'M169.5,137.5c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5h-7.4v1L169.5,137.5L169.5,137.5z'
    		        	+'M167.5,135c0.3,0,0.5-0.2,0.5-0.5s-0.2-0.5-0.5-0.5h-5.4v1L167.5,135L167.5,135z',
            		fillOpacity: 1,
    		        scale: 1,
    		        width :100, 
    		        fillColor: '#2E2EFE',//content.indicador.indicadorCodigo,
//    		        strokeColor: content.indicador.indicadorCodigo,
    		        strokeWeight: 1,
    		        scaledSize: new google.maps.Size(40, 40), // scaled size
    		        origin: new google.maps.Point(0, 0), // origin
    		        anchor: new google.maps.Point(170, 150)
    		   };
            var marker = new google.maps.Marker({
                position: coordenadas,
                map: $scope.gMap,
                draggable: false,
                icon : icon,
                animation: google.maps.Animation.DROP
            });
        }else{
			var marker = new google.maps.Marker({
	 		   position: coordenadas,
	 		   map: $scope.gMap,
	 		   draggable: false,
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
       
		 if(content.puntoActual==0){
			 $scope.rutass[x].infoWindows[content.index].setContent([
			   '<div style="text-align:center;">',
			   '<br/><strong>Ruta: </strong>',
	           content.ruta,
	           '<br/><strong>Parada: </strong>',
	           content.descripcionOrigen + ' - ' + content.descripcionLocalidad,
	           '<br/><strong>Adicional: </strong>' +
	           content.descripcionEvento +
	           '<br/><strong>Fecha programada de arribo: </strong>' +
	           moment(content.fechaEvento).format('DD/MM/YYYY hh:mm A'),
	       		'</div>'
	           ].join(''));
		 }else{
			 $scope.rutass[x].infoWindows[content.index].setContent([
  			   '<div>',
  			   '<br/><strong>Ruta: </strong>',
  	           content.ruta,
  	           '<br/><strong>Punto intermedio: </strong>',
  	           content.descripcionOrigen + ' - ' + content.descripcionLocalidad,
  	           '<br/><strong>Adicional: </strong>' +
  	           content.descripcionEvento +
  	           '<br/><strong>Fecha programada de próximo arribo: </strong>' +
  	           moment(content.fechaEvento).format('DD/MM/YYYY hh:mm A'),
  	           '<br/><strong>Latitud: </strong>',
  	           markerLatLng.lat(),
  	           '<br/><strong>Longitud: </strong>',
  	           markerLatLng.lng(),
  	       		'</div>'
  	           ].join(''));
		 }
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
	
	$scope.initMap = function(idd) {
		 var options = {
			center: {
		        lat: 19.374610,
		        lng:  -99.083722
		    },
	     	zoom: 11,
	     	mapTypeId: google.maps.MapTypeId.ROADMAP,
	     	gestureHandling:'greedy'
		 }
		 mapInstancesPool.reset();
		 $scope.gMap = mapInstancesPool.getInstance(idd,options).map;
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
	
	$scope.initMap('map4');
	$scope.searchOperacion(rutaIdRouteConfig);
});