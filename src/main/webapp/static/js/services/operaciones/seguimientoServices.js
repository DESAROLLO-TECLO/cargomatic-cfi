angular.module(appTeclo).service('seguimientoServices',function($http,config) {
	
	var app = "/dataTmp/seguimiento";
//	var app2 = "/dataTmp/solicitudes";
	var urlConfig = config.baseUrl+app;
	var cotizada = undefined;
	var isSearch = false;
	
	this.getSeguimientos = function(data) {
		return $http.get(urlConfig + "/seguimiento.json");
	};
	
	this.getSeguimientoSolicitudes = function(data) {
		return $http.get(urlConfig + "/solicitudes.json");
	};
	
	this.getSeguimientoEnvios = function(envios) {
		return $http.get(urlConfig + "/"+ envios);
	};
	
	this.getSolicitudesEstatus = function(data) {
		return $http.get(urlConfig + "/solicitudesEstatus.json");
	};
	
	this.getEnviosEstatus = function(data) {
		return $http.get(urlConfig + "/envioEstatus.json");
	};
	
	this.getProveedores = function() {
		return $http.get(urlConfig + "/provedoresAtencion.json");
	};
	
	this.setCotizada = function(object){
		cotizada = object;
	}
	
	this.getCotizada = function(){
		return cotizada;
	}
	
	this.setSearch = function(flag){
		isSearch = flag;
	}
	
	this.getSearch = function(){
		return isSearch;
	}
});