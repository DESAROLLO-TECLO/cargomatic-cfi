angular.module(appTeclo)
.service('menuDinamicoService',
function($http,jwtService,storageService,config) {
	
	var app = "/dataTmp/aplicacion";
	
	this.buscarMenuUsuario = function () {
		
		var token = storageService.getToken();
		var placa = jwtService.getPlacaUsuario(token);
		
		return $http.get(config.baseUrl+app+"/menu.json");
	
	};
	
});