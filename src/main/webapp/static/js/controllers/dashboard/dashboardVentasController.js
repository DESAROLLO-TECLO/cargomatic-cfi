angular.module(appTeclo).controller('dashboardVentasController', function($scope, $filter) {
	$scope.ctrl={
			valueUnidadesActivas:1,
			unidadesActivas:90,
			valueUnidadesMantenimiento:1,
			unidadesMantenimiento:7,
			valueUnidadesDetenidos:1,
			unidadesDetenidos:3,
			duration:1000,
			effect:'swing'	
	};
	
	$scope.ctrls = 
		[
			{myValue:1, nbPanel: "Envíos completados", myTarget:67, myDuration:1500, bgPanel:'bg-green', icon: "fa-truck", myEffect:'swing'},
			{myValue:2, nbPanel: "Envíos en proceso", myTarget:23, myDuration:1500, bgPanel:'bg-aqua', icon: "fa-truck", myEffect:'swing'},
			{myValue:3, nbPanel: "Enviós retrasados", myTarget:10, myDuration:1500, bgPanel:'bg-red', icon: "fa-truck", myEffect:'swing'}
		];
	
	$scope.vehiculosActivos = [
		{"index" : "1","codigoVeh" : "EQ 0001","placaVeh" : "IUO542","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "CAJA CERRADA DE 53 PIES"},
		{"index" : "2","codigoVeh" : "EQ 0002","placaVeh" : "TPC892","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "CAJA CERRADA DE 53 PIES"},
		{"index" : "5","codigoVeh" : "EQ 0003","placaVeh" : "FGS0018","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "5","codigoVeh" : "EQ 0004","placaVeh" : "GHT1129","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "TORTON (2 EJES)"},
		{"index" : "6","codigoVeh" : "EQ 0005","placaVeh" : "AB129","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "5","codigoVeh" : "EQ 0006","placaVeh" : "FGS0018","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "0","codigoVeh" : "EQ 0007","placaVeh" : "887HKM","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "3","codigoVeh" : "EQ 0008","placaVeh" : "PLK1277","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "8","codigoVeh" : "EQ 0009","placaVeh" : "ABZ996","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "7","codigoVeh" : "EQ 0010","placaVeh" : "129PTE","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"}
	];
	
	$scope.vehiculosMantto = [
		{"index" : "5","codigoVeh" : "EQ 0003","placaVeh" : "FGS0018","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "5","codigoVeh" : "EQ 0004","placaVeh" : "GHT1129","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "TORTON (2 EJES)"},
		{"index" : "6","codigoVeh" : "EQ 0005","placaVeh" : "AB129","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "5","codigoVeh" : "EQ 0006","placaVeh" : "FGS0018","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "0","codigoVeh" : "EQ 0007","placaVeh" : "887HKM","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "3","codigoVeh" : "EQ 0008","placaVeh" : "PLK1277","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "8","codigoVeh" : "EQ 0009","placaVeh" : "ABZ996","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "7","codigoVeh" : "EQ 0010","placaVeh" : "129PTE","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"}
	];
	
	$scope.vehiculosDetenidos = [
		{"index" : "0","codigoVeh" : "EQ 0007","placaVeh" : "887HKM","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "3","codigoVeh" : "EQ 0008","placaVeh" : "PLK1277","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"},
		{"index" : "8","codigoVeh" : "EQ 0009","placaVeh" : "ABZ996","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "RABON (1 EJE)"},
		{"index" : "7","codigoVeh" : "EQ 0010","placaVeh" : "129PTE","marcaVeh" : "TORTON (2 EJES)","modeloVeh" : "TORTON (2 EJES)","tipoVeh" : "JAULA ENLONADA / CORTINA"}
	];
	
	initController = function() {
		graficaRefaccionesUtilizadas();
		graficaUnidadesMasMantenimiento();
		graficaUnidadesMantenimiento();
	}
	
	graficaRefaccionesUtilizadas = function() {
		var chartUnidadesMantenimiento = AmCharts.makeChart("refaccionesUtilizadas", {
			"type": "serial",
		    "theme": "light",
		    "legend": {
		        "useGraphSettings": true
		    },
		    "dataProvider": [{
		        "year": "Ene",
		        "bombaGasolina": 13,
		        "filtroAire": 45,
		        "balatas": 20,
		        "bujia": 59,
		        "bandaDistribucion": 14
		    }, {
		        "year": "Feb",
		        "bombaGasolina": 11,
		        "filtroAire": 15,
		        "balatas": 38,
		        "bujia": 51,
		        "bandaDistribucion": 20
		    }, {
		        "year": "Mar",
		        "bombaGasolina": 18,
		        "filtroAire": 25,
		        "balatas": 33,
		        "bujia": 45,
		        "bandaDistribucion": 27
		    }, {
		        "year": "Abr",
		        "bombaGasolina": 10,
		        "filtroAire": 15,
		        "balatas": 31,
		        "bujia": 35,
		        "bandaDistribucion": 16
		    }, {
		        "year": "May",
		        "bombaGasolina": 22,
		        "filtroAire": 32,
		        "balatas": 23,
		        "bujia": 35,
		        "bandaDistribucion": 22
		    }, {
		        "year": "Jun",
		        "bombaGasolina": 23,
		        "filtroAire": 33,
		        "balatas": 56,
		        "bujia": 12,
		        "bandaDistribucion": 31
		    }, {
		        "year": "Jul",
		        "bombaGasolina": 24,
		        "filtroAire": 37,
		        "balatas": 22,
		        "bujia": 33,
		        "bandaDistribucion": 24
		    }, {
		        "year": "Ago",
		        "bombaGasolina": 21,
		        "filtroAire": 25,
		        "balatas": 12,
		        "bujia": 19,
		        "bandaDistribucion": 24
		    }, {
		        "year": "Sep",
		        "bombaGasolina": 12,
		        "filtroAire": 32,
		        "balatas":56,
		        "bujia": 55,
		        "bandaDistribucion": 37
		    }, {
		        "year": "Oct",
		        "bombaGasolina": 23,
		        "filtroAire": 12,
		        "balatas": 54,
		        "bujia": 35,
		        "bandaDistribucion": 29
		    }, {
		        "year": "Nov",
		        "bombaGasolina": 19,
		        "filtroAire": 15,
		        "balatas": 34,
		        "bujia": 15,
		        "bandaDistribucion": 12
		    },
		    {
		        "year": "Dic",
		        "bombaGasolina": 1,
		        "filtroAire": 5,
		        "balatas": 3,
		        "bujia": 5,
		        "bandaDistribucion": 7
		    }],
		    "valueAxes": [{
		        "integersOnly": true,
		        "maximum": 60,
		        "minimum": 1,
		        "reversed": true,
		        "axisAlpha": 0,
		        "dashLength": 5,
		        "gridCount": 10,
		        "position": "left",
		        "title": ""
		    }],
		    "startDuration": 0.5,
		    "graphs": [{
		        "balloonText": "CIUDAD DE MÉXICO-CAMPECHE: [[value]]",
		        "bullet": "round",
		        "title": "CIUDAD DE MÉXICO-CAMPECHE",
		        "valueField": "bombaGasolina",
				"fillAlphas": 0
		    }, {
		        "balloonText": "QUERETARO-BAJA CALIFORNIA: [[value]]",
		        "bullet": "round",
		        "title": "QUERETARO-BAJA CALIFORNIA",
		        "valueField": "filtroAire",
				"fillAlphas": 0
		    }, {
		        "balloonText": "YUCATÁN-TABASCO: [[value]]",
		        "bullet": "round",
		        "title": "YUCATÁN-TABASCO",
		        "valueField": "balatas",
				"fillAlphas": 0
		    }, {
		        "balloonText": "CHIAPAS-GUERRERO: [[value]]",
		        "bullet": "round",
		        "title": "CHIAPAS-GUERRERO",
		        "valueField": "bujia",
				"fillAlphas": 0
		    }, {
		        "balloonText": "MONTERREY-SINALOA: [[value]]",
		        "bullet": "round",
		        "title": "MONTERREY-SINALOA",
		        "valueField": "bandaDistribucion",
				"fillAlphas": 0
		    }],
		    "chartCursor": {
		        "cursorAlpha": 0,
		        "zoomable": false
		    },
		    "categoryField": "year",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "axisAlpha": 0,
		        "fillAlpha": 0.05,
		        "fillColor": "#000000",
		        "gridAlpha": 0,
		        "position": "top"
		    },
		    "export": {
		    	"enabled": true,
		        "position": "bottom-right"
		     }
		});
	}
	
	graficaUnidadesMasMantenimiento = function() {
		var chart = AmCharts.makeChart("unidadesMasMantenimiento", {
		    "theme": "light",
		    "type": "serial",
		    "dataProvider": [{
		        "year": "Rabón (1 eje)",
		        "income": 23
		    }, {
		        "year": "Caja Refrigeradora",
		        "income": 26
		    }, {
		        "year": "Torton (2 ejes)",
		        "income": 30
		    }, {
		        "year": "Tolva",
		        "income": 29
		    }, {
		        "year": "Jaula Ganadera",
		        "income": 24
		    }],
		    "valueAxes": [{
		        "title": ""
		    }],
		    "graphs": [{
		        "balloonText": "[[category]]: [[value]]",
		        "fillAlphas": 1,
		        "lineAlpha": 0.2,
		        "title": "Income",
		        "type": "column",
		        "valueField": "income"
		    }],
		    "depth3D": 20,
		    "angle": 30,
		    "rotate": true,
		    "categoryField": "year",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "fillAlpha": 0.05,
		        "position": "left"
		    },
		    "export": {
		    	"enabled": true
		     }
		});
	}
	
	graficaUnidadesMantenimiento = function() {
		var unidadesMantenimiento = AmCharts.makeChart( "unidadesMantenimiento", {
			"type": "pie",
			  "theme": "donaMantto",
			  "dataProvider": [ {
			    "title": "Tampiqueños S.A de C.V",
			    "value": 53
			  }, {
			    "title": "CFI Drive",
			    "value": 7
			  }, 
			  {
				  "title": "Laguna de la palma",
				  "value": 19
			  },
			  {
				  "title": "Solutions Cargo",
				  "value": 14
			  },
			  {
				  "title": "SE Global Logistics SA de CV",
				  "value": 21
			  }],
			  "titleField": "title",
			  "valueField": "value",
			  "labelRadius": 5,

			  "radius": "42%",
			  "innerRadius": "60%",
			  "labelText": "[[title]]",
			  "export": {
			    "enabled": true
			  }
			} );
	}
	
	initController();
});