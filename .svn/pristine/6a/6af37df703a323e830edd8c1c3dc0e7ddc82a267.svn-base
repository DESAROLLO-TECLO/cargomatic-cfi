angular.module(appTeclo).service('pedidosService',function($http,config) {
	
	var app = "/dataTmp/envios";
	var urlConfig = config.baseUrl+app;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.obtenerEnvios = function(data) {
		return $http.get(urlConfig + "/envios.json");
	};
	
	
	this.obtenerPedidos = function(data){
		return $http.get(urlConfig + "/pedidos.json");
	};
});