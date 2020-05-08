angular.module(appTeclo).config(function($routeProvider, $locationProvider) {
	
	$routeProvider.when("/invitado", {
		templateUrl : "views/invitado/invitado.html",
		controller: "invitadoController"
	});
	
	$routeProvider.when("/", {
		templateUrl : "login.html",
		controller: "loginController"
	});
	
	$routeProvider.when("/login", {
		templateUrl : "login.html",
		controller: "loginController"
	});
	
	$routeProvider.when("/error", {
		templateUrl : "views/error.html",
	});
	
	$routeProvider.when("/index",{
		templateUrl : "views/index.html",
	});
	
	$routeProvider.when("/accesoNegado", {
		templateUrl : "views/accesoNegado.html",
	});
	
	$routeProvider.otherwise({redirectTo: "/index"});
	
	//Modulos Cliente
	$routeProvider.when("/nuevaSolicitud", {
		templateUrl : "views/invitado/nuevaSolicitud.html",
		controller: "invitadoController"
	});
	
	$routeProvider.when("/consultaSolicitudes", {
		templateUrl : "views/invitado/consulta.html",
		controller: "consultaController"
	});
	
	$routeProvider.when("/consultaSolicitudes/detalleSolicitud/:id", {
		templateUrl : "views/invitado/detalleSolicitud.html",
		controller: "detalleSolicitudController",
		resolve:{
			solicitudId: function($route){
				return $route.current.params.id;
			}
		}
	});
	
	$routeProvider.when("/actividades", {
		templateUrl : "views/invitado/graficas.html",
		controller: "graficasController"
	});
	
	/*___________________________________________________________
	________** INICIO -> ADMINISTRACIÓN CONTROLLERS ** ________*/
	$routeProvider.when("/administracionModificaClave",{
		templateUrl : "views/administracion/administracionModificaClave.html",
		controller : "administracionModificaClaveController"
	});
	
//	Configurar Aplicación
	$routeProvider.when("/configuracion", {
		templateUrl : "views/administracion/configuracionApp.html",
		controller: "configuracionAppController"
    });
	
//	Componentes Web
	$routeProvider.when("/componentesWeb",{
		templateUrl : "views/administracion/resources/pluginsWeb.html",
		controller : "pluginsWebController"
	});
	
	/*___________________________________________________________
	________________** INICIO -> PROVEEDORES** ________________*/
	$routeProvider.when("/rutas", {
		templateUrl : "views/rutas/rutas.html",
		controller : "rutasController"
	});
	//TERMINA MÓDULO DE PROVEEDORES

	
	/*___________________________________________________________
	_________________** INICIO ->  OPERACIONES** _______________*/
	
	$routeProvider.when("/operacionesConsulta", {
		templateUrl : "views/operaciones/operacionesConsulta.html",
		controller : "operacionesConsultaController"
	});
	
	
	
	$routeProvider.when("/seguimientoSolicitudes", {
		templateUrl : "views/operaciones/seguimiento.html",
		controller : "seguimientoController",
		resolve:{
			solicitudes : 
				function(seguimientoServices){
					return seguimientoServices.getSeguimientoSolicitudes();
				
			},
			estatusSeguimiento : 
				function(seguimientoServices){
					return seguimientoServices.getSolicitudesEstatus();
				
			}
		}
	});
	
	$routeProvider.when("/seguimientoEnvios/:file", {
		templateUrl : "views/envios/seguimientoEnvios.html",
		controller : "seguimientoEnviosController",
		resolve:{
			solicitudes : 
				function(seguimientoServices, $filter, $route){
					return seguimientoServices.getSeguimientoSolicitudes();
				
			},
			solicitud: function ($route){ return $route.current.params.file},
			envios : 
				function(seguimientoServices, $route){
					return seguimientoServices.getSeguimientoEnvios($route.current.params.file);
				
			},
			estatusEnviosSeguimiento : 
				function(seguimientoServices){
					return seguimientoServices.getEnviosEstatus();
				
			}
		}
	});
	
	$routeProvider.when("/seleccionProveedor/:file",{
		templateUrl : "views/envios/seleccionProveedor.html",
		controller : "seleccionProveedorController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/seleccionProvDeclinado/:file",{
		templateUrl : "views/envios/seleccionProvDeclinado.html",
		controller : "seleccionProvDeclinadoController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/listadoCotizaciones/:file",{
		templateUrl : "views/cotizaciones/listadoCotizaciones.html",
		controller : "listadoCotizacionesController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedoresDefault: function (cotizacionesService) {
				return cotizacionesService.listaCotizacion();
			},
			otrosProveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/esperaClienteCotizaciones/:file",{
		templateUrl : "views/cotizaciones/esperaClienteCotizaciones.html",
		controller : "esperaClienteCotizacionesController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedoresDefault: function (cotizacionesService) {
				return cotizacionesService.listaCotizacion();
			},
			otrosProveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/cotizacionDeclinada/:file",{
		templateUrl : "views/cotizaciones/cotizacionDeclinada.html",
		controller : "cotizacionDeclinadaController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedoresDefault: function (cotizacionesService) {
				return cotizacionesService.listaCotizacion();
			},
			otrosProveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/cotizacionAgotada/:file",{
		templateUrl : "views/cotizaciones/cotizacionAgotada.html",
		controller : "cotizacionAgotadaController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedoresDefault: function (cotizacionesService) {
				return cotizacionesService.listaCotizacion();
			},
			otrosProveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/sinCotizaciones/:file",{
		templateUrl : "views/cotizaciones/sinCotizaciones.html",
		controller : "sinCotizacionesController",
		resolve: {
			solicitud: function ($route){ return $route.current.params.file },
			proveedoresDefault: function (cotizacionesService) {
				return cotizacionesService.listaCotizacion();
			},
			otrosProveedores: function (seguimientoServices) {
				return seguimientoServices.getProveedores();
			}
        }
	});
	
	$routeProvider.when("/monitoreoRuta/:id", {
		templateUrl : "views/operaciones/monitoreoRuta.html",
		controller : "monitoreoRutaController",
		resolve:{
			monitoreoId: function($route){
				return $route.current.params.id;
			}
		}
	});
	//TERMINA MÓDULO DE OPERACIONES
	/*___________________________________________________________
	________** INICIO -> PROVEEDORES CONTROLLERS ** ________*/
	
	$routeProvider.when("/registroProveedores", {
		templateUrl : "views/proveedores/registro.html",
		controller: "registroController",
		resolve: {
			object: function ($route) {
				return undefined;
			}
        }
	});
	
	$routeProvider.when("/informacionGeneral", {
		templateUrl : "views/proveedores/informacionGeneral.html",
		controller: "registroController"
	});
	
	$routeProvider.when("/serviciosRuta", {
		templateUrl : "views/proveedores/serviciosRuta.html",
		controller: "registroController"
	});
	
	$routeProvider.when("/consultaProveedores", {
		templateUrl : "views/proveedores/consulta.html",
		controller: "consultaController"
	});
	
	$routeProvider.when("/consultaProveedores/modificacionProveedores/:id", {
		templateUrl : "views/proveedores/registro.html",
		controller: "registroController",
		resolve: {
			object: function ($route) {
				return $route.current.params.id;
			}
        }
	});
	
	$routeProvider.when("/operacionesConsulta/evaluacionProveedores/:folio", {
		templateUrl : "views/proveedores/evaluacion.html",
		controller: "evaluacionController",
		resolve: {
			folio: function ($route) {
				return $route.current.params.folio;
			}
        }
	});
	//TERMINA MÓDULO DE PROVEEDORES
	
	//INICIA MÓDULO DE COTIZACIONES
	$routeProvider.when("/proveedores",{
		templateUrl : "views/cotizaciones/proveedores.html",
		controller : "cotizacionesController",
		resolve: {
			object: function ($route) {
				return undefined;
			}
        }
	});
	
	$routeProvider.when("/proveedores/:id",{
		templateUrl : "views/cotizaciones/proveedores.html",
		controller : "cotizacionesController",
		resolve: {
			object: function ($route) {
				return $route.current.params.id;
			}
        }
	});
	
	$routeProvider.when("/contratacion",{
		templateUrl : "views/cotizaciones/contratacion.html",
		controller : "contratacionController",
		resolve: {
			idSolicitud: function ($route) {
				return null;
			}
        }
	});
	
	$routeProvider.when("/agregarOrden",{
		templateUrl : "views/envios/ordenEnvio.html",
		controller : "ordenesEnvioController"
	});
	
	
	//TERMINA MÓDULO DE COTIZACIONES
	//INICIA MÓDULO DE TABLEROS DE CONTROL

	$routeProvider.when("/dashboardProveedores",{
		templateUrl : "views/dashboard/dashboardProveedores.html",
		controller : "dashboardProveedoresController"
	});
	
	$routeProvider.when("/dashboardVentas",{
		templateUrl : "views/dashboard/dashboardVentas.html",
		controller : "dashboardVentasController"
	});
	//TERMINA MÓDULO DE TABLEROS DE CONTROL

	//REDIRECCIONAR CONTRATACIÓN
	$routeProvider.when("/contratacion/:id",{
		templateUrl : "views/cotizaciones/contratacion.html",
		controller : "contratacionController",
		resolve: {
			idSolicitud: function ($route) {
				return $route.current.params.id;
			}
        }
	});
	
	/*Inicia controller de proveedores*/
	$routeProvider.when("/seguimiento",{
		templateUrl : "views/perfilproveedores/seguimiento.html",
		controller : "seguimientoProveedorController",
		resolve: {
			solicitudes: function (seguimientoProveedorService) {
				return seguimientoProveedorService.obtenerSolicitudes();
			}
		}
	});
	
	$routeProvider.when("/cotizaciones",{
		templateUrl : "views/perfilproveedores/tablerosCotizacion.html",
		controller : "tablerosCotizacionController",
		resolve :{
			solicitudes : function (seguimientoProveedorService){
				return seguimientoProveedorService.obtenerSolicitudes();
			}
		}
	});
	
	
	/*Finaliza controller de proveedores*/
	
	
	/*___________________________________________________________
	________** FIN -> ADMINISTRACIÓN CONTROLLERS ** ___________*/
	
	
	
});