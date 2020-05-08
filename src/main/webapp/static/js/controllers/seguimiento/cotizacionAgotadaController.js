angular.module(appTeclo).
controller('cotizacionAgotadaController', function($scope, $filter, $timeout, $interval, growl, $controller, $q, $window, cotizacionesService, rutasService, $compile, proveedoresDefault, otrosProveedores, solicitud) {
	$scope.solicitud = solicitud;
	$scope.proveedoresAll = proveedoresDefault.data.cotizadores;
	$scope.proveedoresDefault = angular.copy($scope.proveedoresAll);
	$scope.otrosProveedores = otrosProveedores.data.otrosProv;

	$scope.getListado = function(){
		cotizacionesService.listaCotizacion()
		.success(function(data){
			$scope.cotizadores = data.cotizadores;
		});
	}
	
	$scope.getListado();
	$scope.goCot= function(cot){
		$scope.seleccionCot = cot
	};
	
	$scope.proveedoresSelected = [];
	
	$scope.add = function(item, index){
		$scope.proveedoresSelected.push(item);
		$scope.proveedoresDefault.splice(index, 1);
	}
	
	$scope.newCot = function(item, index){
		$scope.proveedoresCotizacionManual.push(item);
		$scope.proveedoresDefault.splice(index, 1);
	}
	
	$scope.addAll = function(){
		$scope.proveedoresSelected = angular.copy($scope.proveedoresAll);
		$scope.proveedoresDefault = [];
	}
	
	$scope.removeItem = function(item, index){
		$scope.proveedoresDefault.push(item);
		$scope.proveedoresSelected.splice(index, 1);
	}
	
	$scope.removeAll = function(){
		$scope.proveedoresDefault = angular.copy($scope.proveedoresAll);
		$scope.proveedoresSelected = [];
	}
	
	$scope.provedoresEnviados = [];
	$scope.sendItems = function(){
		$scope.provedoresEnviados = $scope.provedoresEnviados.concat($scope.proveedoresSelected);
		$scope.proveedoresSelected = [];
		$scope.proveedoresAll = angular.copy($scope.proveedoresDefault);
	}
	
	
	
	$scope.setFaIcons = function(){
		angular.forEach($scope.proveedoresDefault, function(v, k, o){
			if(k == "0" || k == 0){
				v.faIcon = "fa-check";
				v.buttonColor="btn-success";
			}else{
				v.faIcon = "fa-refresh";
				v.buttonColor="btn-danger";
			}
		})
	}
	
	$scope.otrosProveCheckedAll = false;
	$scope.toogleAll = function(){
		for(var x in $scope.otrosProveedores){
			$scope.otrosProveedores[x].checked = $scope.otrosProveCheckedAll;
		}
	}
	
	$scope.toogleSingle = function(i){
		broken = false;
		for(var x in $scope.otrosProveedores){
			if(!$scope.otrosProveedores[x].checked){
				$scope.otrosProveCheckedAll = false;
				broken = true;
				break;
			}
		}
		if(!broken){
			$scope.otrosProveCheckedAll = true;
		}
	}
	
	$scope.setFaIcons();
	$scope.add($scope.proveedoresDefault[1], 1);
	$scope.add($scope.proveedoresDefault[2], 2);
	$scope.sendItems();
	
	$scope.proveedoresCotizacionManual = [];
	$scope.cotizar = function(){
		i = [];
		angular.forEach($scope.otrosProveedores, function(v,k,o){
			if(v.checked){
				i.push(k);
				$scope.proveedoresCotizacionManual.push(v);
				v.drop=true;
			}
		});
		
		do{
			complete = true;
			for(var x in $scope.otrosProveedores){
				if($scope.otrosProveedores[x].drop){
					$scope.otrosProveedores.splice(x, 1);
					complete = false;
					break;
				}
			}
			if(complete) break;
		}while (true);
	}
});