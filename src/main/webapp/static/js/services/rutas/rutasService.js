angular.module(appTeclo).service('rutasService',function($http,config) {
	
	var app = "/dataTmp/rutas";
	var urlConfig = config.baseUrl+app;
	var flag = false;
	
	this.obtenerRutas = function() {
		return $http.get(urlConfig + "/origenesdestino.json");

	};
	
	this.obtenerRutasInventario = function() {
		return $http.get(urlConfig + "/inventarioRutas.json");

	};
	
	this.monitoreo = function() {
		return $http.get(urlConfig + "/monitoreo.json");

	};
	
	this.setFlag = function(bandera) {
		flag = bandera;
 	};
	
	this.getFlag = function() {
		return flag;
	}
});