angular.module(appTeclo).controller("registroController",
function($scope, $filter, $timeout, proveedoresService, cotizacionesService, showAlert, ModalService, object) {
	var isUpdate = angular.isDefined(object) && object != null;
	
	$scope.titleModule = "Registro";
	$scope.titleBox = "Nuevo Proveedor";
	
	$scope.configuracionSelected = 't1';
	$scope.general = {};
	$scope.routes = {count: 0, countPrices:0}
	$scope.showModal = false;
	
	$scope.dateLegalStructure = [];
	$scope.origenes = [];
	$scope.destinos = [];
	$scope.categories = [];
	$scope.subcategorias = [];
	$scope.subcategoriasFiltro = [];
	$scope.truckTypes = [];
	
	$scope.newe = {origen:'', destino:'', latitudOrigen:0.0, longitudOrigen:0.0, latitudDestinio:0.0, longitudDestino:0.0};
	$scope.fieldsets = [{Id: 0, origin:'', destination:'', categories: [], subcategories: [], coin: '', prices: [], listTrucks: [] }];
	
	$scope.goTab = function(tab){
		$scope.configuracionSelected = tab;
	}
	
	$scope.addNewRoute = function() {
		$scope.routes.count = $scope.routes.count + 1;
		$timeout(function() {
			$scope.fieldsets.push({'Id':$scope.routes.count, origin:'', destination:'', originObject: {}, destinationObject: {}, categories: [], subcategories: [], coin: '', prices:[], listTrucks: []});
		},200); 
	}
	
	$scope.addNewPrice = function(index){
		$scope.routes.countPrices = $scope.routes.countPrices + 1;
		$timeout(function() {
			$scope.fieldsets[index].prices.push({'Id': $scope.routes.countPrices, price: 0.00});
		},200);
	}
	
	$scope.removeRoute = function(index){
		$scope.fieldsets.splice(index, 1);
		
		if($scope.fieldsets.length === 0 || $scope.fieldsets.length == null){
			$scope.routes.count = 0;
			$scope.fieldsets = [{Id: 0, origin:'', destination:'', originObject: {}, destinationObject: {}, categories: [], subcategories: [], coin: '', prices:[], listTrucks: [] }];
	    }
		
		$scope.routes.count = $scope.routes.count - 1;
	}
	
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
	}
	
	initialData = function(){
		proveedoresService.obtenerDatosRegistro().success(function(data) {
			$scope.dateLegalStructure = data.legalStructure;
			
			cotizacionesService.obtenerDatosCotiza().success(function(data) {
				$scope.origenes = data.orgien;
				$scope.destinos = data.destino;
				$scope.categories = data.categoria;
				$scope.subcategorias = data.subcategoria;
				$scope.truckTypes = data.camion;
				
				if(isUpdate){loadData()};
			}).error(function(data) {
				
			});
		}).error(function(data) {
			
		});
	}
	
	$scope.guardar = function(){
		$scope.general = {};
		$scope.routes = {count: 0}
		$scope.fieldsets = [{Id: 0, origin:'', destination:'', category: 0, subcategory: 0, coin: '', price: '$0,00' }];
		showAlert.aviso("Registro guardado correctamente", null);
	}
	
	$scope.saveModal = function() {
		showAlert.aviso("Ruta guardada correctamente", null);
		$scope.newe = {origen:'', destino:'', latitud:0.0, longitud:0.0};
		ModalService.closeModal();
	}
	
	loadData = function(){
		$scope.titleModule = "Modificación";
		$scope.titleBox = "Moficación de Proveedor";
		proveedoresService.setFlag(true);
		proveedoresService.obtenerDatosConsulta().success(function(data) {
		var flag = false;
			for(var i in data.proveedores){
				if(object === data.proveedores[i].id){
					$scope.general.name = data.proveedores[i].name;
					$scope.general.address = data.proveedores[i].address;
					$scope.general.phone = data.proveedores[i].phone;
					$scope.general.country = data.proveedores[i].country;
					$scope.general.state = data.proveedores[i].state;
					$scope.general.city = data.proveedores[i].city;
					$scope.general.zipcode = data.proveedores[i].zipcode;
					$scope.general.contactName = data.proveedores[i].ncontacto;
					$scope.general.contactPhone = data.proveedores[i].tcontacto;
					$scope.general.contactEmail = data.proveedores[i].ccontacto;
					$scope.general.legalCod = data.proveedores[i].legalCod;
					
					if(data.proveedores[i].rutas.length > 0){
						$scope.fieldsets.splice(0, 1);
						for(var r in data.proveedores[i].rutas){
							var obj = {
								Id: data.proveedores[i].rutas[r].id, 
								origin: data.proveedores[i].rutas[r].origenId.nbUbicacion, 
								destination: data.proveedores[i].rutas[r].destinoId.nbUbicacion, 
								originObject: data.proveedores[i].rutas[r].origenId, 
								destinationObject: data.proveedores[i].rutas[r].destinoId, 
								category: data.proveedores[i].rutas[r].categoria.id, 
								subcategory: data.proveedores[i].rutas[r].subcategoria.id, 
								coin : data.proveedores[i].rutas[r].moneda, 
								price: data.proveedores[i].rutas[r].precio 	
							};
							$scope.filtraSubcategoria(obj.category);
							$scope.fieldsets.push(obj);
							//angular.element("#select2-category"+r+"-container").text(data.proveedores[i].rutas[r].categoria.nbCategoria)
						}
					}
					
					flag = true;
				}
				
				if(flag){
					break;
				}
			}
		}).error(function(data) {
			
		});
			
		}
	
		
	initialData();
	
	
});