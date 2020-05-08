angular.module(appTeclo).service('cotizacionesService',function($http,config) {
	
	var app = "/dataTmp/cotizaciones";
	var urlConfig = config.baseUrl+app;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.obtenerDatosCotiza = function(data) {
		return $http.get(urlConfig + "/cotizacion.json");
	};
	
	this.listaCotizacion = function() {
		return $http.get(urlConfig + "/listadoCotizaciones.json");
	};
});