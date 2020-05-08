angular.module(appTeclo).service('ordenesEnvioService',function($http,config) {
	
	var app = "/dataTmp/envios";
	var urlConfig = config.baseUrl+app;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.obtenerEnvios = function(data) {
		return $http.get(urlConfig + "/envios.json");
	};
});