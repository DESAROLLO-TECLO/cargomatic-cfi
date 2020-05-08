angular.module(appTeclo).service('proveedoresService',function($http,config) {
	
	var app = "/dataTmp/proveedores";
	var urlConfig = config.baseUrl+app;
	var flag = false;
	
	this.obtenerDatosRegistro = function(data) {
		return $http.get(urlConfig + "/registro.json");
	};
	
	this.obtenerDatosConsulta = function(data) {
		return $http.get(urlConfig + "/consulta.json");
	};
	
	this.setFlag = function(bandera) {
		flag = bandera;
 	};
	
	this.getFlag = function() {
		return flag;
	}
	
});