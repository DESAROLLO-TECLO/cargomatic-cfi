angular.module(appTeclo).
controller('operacionesConsultaController', function($scope, $filter, $timeout, $interval, growl, $controller, $q, $window, cotizacionesService, rutasService, $compile) {
	
	$scope.searchVO = {};
	$scope.vo = {};
	$scope.subcategoriaFiltrada = [];
	$scope.periodo = "s";
	$scope.obtenerDatosCotiza = function (){
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			console.log(data);
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
	
	$scope.searchRoutes = function(){
		rutasService.obtenerRutas().success(function(rutasSet){
			$scope.rutasSet = rutasSet;
		});
	}
	
	$scope.xcont=0;
	
	$scope.setLoad = function(ruta){
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

	$scope.searchRoutes();
	
	
});