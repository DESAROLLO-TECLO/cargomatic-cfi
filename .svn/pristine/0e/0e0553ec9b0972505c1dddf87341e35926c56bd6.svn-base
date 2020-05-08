angular.module(appTeclo).service('invitadoService',function($http,config) {
	
	var app = "/dataTmp/pedidos";
	var app1 = "/dataTmp/cliente";
	var urlConfig = config.baseUrl+app;
	var urlConfig2 = config.baseUrl+app1;
	
	/*
	 * @author: Jorge Luis
	 * @return: Object
	*/
	this.getDatosPedido = function(data) {
		return $http.get(urlConfig + "/pedidos.json");
	};
	
	this.getSolicitudes =  function(){
		return $http.get(urlConfig2 + "/solicitudesWM.json");
	}
	
	this.getEnvios =  function(){
		return $http.get(urlConfig2 + "/pedidosWM.json");
	}
	
	this.getCotizaciones=  function(){
		return $http.get(urlConfig2 + "/cotizacionesWM.json");
	}
	
	this.getInformacionCliente = function(){
		return $http.get(urlConfig2 + "/informacionWM.json");
	}
});