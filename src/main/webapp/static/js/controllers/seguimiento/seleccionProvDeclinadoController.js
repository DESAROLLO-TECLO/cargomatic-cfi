angular.module(appTeclo).
controller('seleccionProvDeclinadoController', function($scope, $filter, $timeout, $interval, growl, $controller, $q, $window, cotizacionesService, rutasService, $compile, solicitud, proveedores) {
	$scope.solicitud = solicitud;
	$("#ex2").slider({});
	$scope.proveedores = proveedores.data;
	
	busquedaProveedor = function() {
		$(function(){
			$('#busquedaProveedor').slimScroll({
				height: '100%',
		        color: '#00243c',
		        opacity: .3,
		        size: "4px",
		        alwaysVisible: false
		    });
		});
	}
	
	$scope.getListado = function(){
		cotizacionesService.listaCotizacion()
		.success(function(data){
			$scope.cotizadores = data.cotizadores;
			busquedaProveedor();
			$scope.addDeclined($scope.cotizadores[1], 1);
			$scope.addDeclined($scope.cotizadores[2], 2);
		});
	}
	$scope.getListado();
	$scope.proveedoresDeclined = [];
	$scope.addDeclined = function(item, index){
		$scope.proveedoresDeclined.push(item);
		$scope.cotizadores.splice(index, 1);
	}
	
	
	
	
	
	$scope.selectedProv=[];
	$scope.goCot= function(cot){
		item = $filter('filter')($scope.selectedProv, {cotizadorId: cot.cotizadorId})[0];
		if(item!=null) return;
		$scope.selectedProv.push(cot);
	};
	
	$scope.removeItem = function(i){
		$scope.selectedProv.splice(i, 1);
	}
	
	$scope.toggleFlag="V";
	
	
	
	$scope.toogleAll = function(){
		for(var x in $scope.proveedores.prs){
			$scope.proveedores.prs[x].checked = $scope.proveedores.checkedAll;
		}
	}
	
	$scope.toogleSingle = function(i){
		broken = false;
		for(var x in $scope.proveedores.prs){
			if(!$scope.proveedores.prs[x].checked){
				$scope.proveedores.checkedAll = false;
				broken = true;
				break;
			}
		}
		if(!broken){
			$scope.proveedores.checkedAll = true;
		}
	}
	
	$scope.slider = {
	  minValue: 15000,
	  maxValue: 25000,
	  options: {
	    floor: 10000,
	    ceil: 50000,
	    translate: function(value, sliderId, label) {
	      switch (label) {
	        case 'model':
	          return '<b>Precio Minímo:</b> $' + value;
	        case 'high':
	          return '<b>Precio Máximo:</b> $' + value;
	        default:
	          return '$' + value
	      }
	    }
	  }
	};
});