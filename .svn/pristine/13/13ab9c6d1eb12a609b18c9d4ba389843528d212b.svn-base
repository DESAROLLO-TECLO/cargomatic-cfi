angular.module(appTeclo).service('seguimientoProveedorService',function($http,config) {
	
	var app = "/dataTmp/perfilproveedores";
	var urlConfig = config.baseUrl+app;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.obtenerSolicitudes = function(data) {
		return $http.get(urlConfig + "/perfilproveedores.json");
	};	
});
