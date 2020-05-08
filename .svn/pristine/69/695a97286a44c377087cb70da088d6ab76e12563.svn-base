angular.module(appTeclo).service('contratacionService',function($http,config) {
	
	var app = "/dataTmp/cotizaciones";
	var urlConfig = config.baseUrl+app;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.obtenerDatosCon = function(data) {
		return $http.get(urlConfig + "/contratacion.json");
	};
});