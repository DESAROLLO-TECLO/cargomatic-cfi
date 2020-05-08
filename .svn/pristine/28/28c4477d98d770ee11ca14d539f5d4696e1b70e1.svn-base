angular.module(appTeclo).controller('invitadoController',function ($scope, $filter,$timeout, growl,showAlert,invitadoService,WizardHandler, $controller, storageService){
	
	$scope.vo = {};
	$scope.subcategoriasFiltro = [];
	$scope.listCiudades=[];
	$scope.nuFechaEntrega = moment().add('days',3).format('L');
	
	//$scope.nuFechaEntrega =
	//console.log($scope.nuFechaEntrega);
	
	
	
	$scope.obtenerDatosCotiza = function (){
		invitadoService.getDatosPedido().success(function(data) {
			angular.copy(data,$scope.vo);
			console.log($scope.vo);
		});
	};
	$scope.obtenerDatosCotiza();
	
	
	//Paso dos
	$scope.countTab = 0;
	$scope.pedidoSelected = 'p1';
	$scope.resumeSelected = 'p1';
	$scope.goPedido = function(tab){
		$scope.pedidoSelected = tab;
	}
	
	$scope.goResume = function(tab){
		$scope.resumeSelected = tab;
	}
	
	$scope.tabList = [{		
		id: 0, code: 'p1',
		categories: [], subcategories: [], empaquetado: '',
		largo: 0, ancho: 0, alto: 0, unidadMedida: '',
		peso: 0, cantidad: 0, unidadPeso: '', valorDeclarado:0, observaciones: ''
	}];
	
	$scope.addNewTab = function(){
		$scope.countTab = $scope.countTab + 1;
		$timeout(function() {
			$scope.tabList.push({'id':$scope.countTab, code: 'p' + ($scope.countTab + 1),
				categories: [], subcategories: [], empaquetado: '',
				largo: 0, ancho: 0, alto: 0, unidadMedida: '',
				peso: 0, unidadPeso: '', valorDeclarado:0, observaciones: ''
			});
		},200); 
	}
	
	$scope.deleteTab = function(index){
		$scope.tabList.splice(index, 1);
		
		if($scope.tabList.length === 0 || $scope.tabList.length == null){
			$scope.countTab = 0;
			$scope.tabList = [{		
				id: 0, code: 'p1',
				categories: [], subcategories: [], empaquetado: '',
				largo: 0, ancho: 0, alto: 0, unidadMedida: '',
				peso: 0, cantidad: 0, unidadPeso: '', valorDeclarado:0, observaciones: ''
			}];
		}else{
			$scope.countTab = $scope.countTab - 1;
		}
		
		$scope.pedidoSelected = $scope.tabList[0].code;
	}
	

	//Paso tres
	$scope.informationContactVO = {};
	$scope.swith = false;
	$scope.switchFactura1 = false;
	$scope.switchFactura2 = false;
	
	if(angular.isDefined(storageService.getToken())){
		invitadoService.getInformacionCliente().success(function(data) {
			$scope.informationContactVO.remitente = data;
		}).error(function(data) {
			
		});
	}
	
	$scope.copyInformation = function (nuevoValor, viejoValor){
		if(nuevoValor){
			$scope.informationContactVO.destinatario = $scope.informationContactVO.remitente;
			if($scope.switchFactura2){
				$scope.switchFactura2 = false;
			}
		}else{
			$scope.informationContactVO.destinatario = {};
		}
		
		$scope.swith = nuevoValor; 
	}
	
	$scope.changeFacturacion = function(nuevoValor, viejoValor, whichSwitch){
		if(!$scope.swith){
			if(whichSwitch == 1){
				if(nuevoValor){
					
				}else{
					
				}
				$scope.switchFactura1 = nuevoValor;
			}else if(whichSwitch == 2){
				$scope.switchFactura2 = nuevoValor;
			}
		}
	}
	
	//Paso cuatro
	$scope.tabSelected = 't1';
	$scope.goTab = function(tab){
		$scope.tabSelected = tab;
	}
	
	$scope.filtraSubcategoria = function (data){
		$scope.subcategoriasFiltro = [];
		if(data != null){
			for(var i=0; i < $scope.vo.subcategoria.length; i++){
				if(data.id === $scope.vo.subcategoria[i].idPadre){
					$scope.subcategoriasFiltro.push($scope.vo.subcategoria[i]);
					//console.log($scope.vo.subcategoria[i]);
				}
			}
		}
	};
	
	$scope.changedCiudad=function(idEstado,nbCombo){
		var list=[];
		if(idEstado==undefined){
			if(nbCombo=='ciudadRe'){
				$("#select2-ciudadRe-container").text('Seleccione');
				$scope.vo.selectCiudadRemitnte=undefined;
			}else{
				$("#select2-ciudadDest-container").text('Seleccione');
				$scope.vo.selectCiudadDest=undefined;
			}
			
			return;
		}
		
		angular.forEach($scope.vo.listCiudades,function(element,key){
			if(idEstado == element.id_estado)
				list.push(element);
		});
		
		if(nbCombo=='ciudadRe'){
			$scope.listCiudadesRemisten=angular.copy(list);
		}else{
			$scope.listCiudadesDets=angular.copy(list);
		}
		
	};
	
	$scope.guardarSoicitud=function(){
		var wizardElement = WizardHandler.wizard('wizardExample');
		wizardElement.reset();
		wizardElement.setEditMode(true);
		
		$("#select2-ciudadRe-container").text('Seleccione');
		$("#select2-ciudadDest-container").text('Seleccione');
		$("#select2-estadoRemi-container").text('Seleccione');
		$("#select2-estadoDest-container").text('Seleccione');
		$("#select2-scurRemi-container").text('Seleccione');
		$("#select2-scurDest-container").text('Seleccione');
		
		$("#select2-categorias-container").text('Seleccione');
		$("#select2-subCat-container").text('Seleccione');
		$("#select2-nbEmpaquetado-container").text('Seleccione');
		$("#select2-tpPago-container").text('Seleccione');
		
		$scope.obtenerDatosCotiza();
		$scope.informationContactVO = {};
		$scope.swith = false;
		$scope.tabSelected = 't1';
		
		
		if(angular.isDefined(storageService.getToken())){
			showAlert.aviso("Folio de Solicitud: 00198176262");
		}else{
			showAlert.aviso("La solicitud se guardó correctamente. En breve será contactado por uno de nuestros asesores. Folio de Solicitud: 00198176262");
		}
		
	}
	
});