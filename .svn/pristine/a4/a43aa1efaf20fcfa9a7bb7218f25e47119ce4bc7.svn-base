angular.module(appTeclo).controller('tablerosCotizacionController', function($scope, $filter, showAlert, growl, $location, $timeout, solicitudes) {
	
	$scope.suppliers = [];
	$scope.filter = {};
	$scope.camiones = [];
	
	angular.element("#input-3").rating();
	angular.element(".caption").hide();
	angular.element(".clear-rating").hide();
	
	if(solicitudes != null){
		angular.copy(solicitudes.data.camion, $scope.camiones);
	}
	
	$scope.tabs = [
	       		{idTab: 1, nbTab: 'Ingresos', isActive: true},
	       		{idTab: 1, nbTab: '', isActive: false}
	       	];
	
	$scope.ctrls = 
		[
			{myValue:1, nbPanel: "En Autorización", myTarget:10, myDuration:1500, bgPanel:'bg-aqua', icon: "fa-comments", myEffect:'swing'},
			{myValue:2, nbPanel: "Por Responder", myTarget:6, myDuration:1500, bgPanel:'bg-yellow', icon: "fa-comments", myEffect:'swing'},
			{myValue:3, nbPanel: "Completadas", myTarget:280, myDuration:1500, bgPanel:'bg-green', icon: "fa-comments", myEffect:'swing'},
			{myValue:4, nbPanel: "Rechazadas", myTarget:3, myDuration:1500, bgPanel:'bg-red', icon: "fa-comments", myEffect:'swing'}
		];
	
	initController = function() {
		var entregaPaquetes = AmCharts.makeChart("entregaPaquetes", {
		    "theme": "light",
		    "type": "serial",
		    "startDuration": 2,
		    "dataProvider": [{
		        "country": "Ene",
		        "visits": 1100,
		        "color": "#009688"
		    }, {
		        "country": "Feb",
		        "visits": 1282,
		        "color": "#4caf50"
		    }, {
		        "country": "Mar",
		        "visits": 1209,
		        "color": "#8bc34a"
		    }, {
		        "country": "Abr",
		        "visits": 1025,
		        "color": "#3f51b5"
		    }, {
		        "country": "May",
		        "visits": 1122,
		        "color": "#00bcd4"
		    }, {
		        "country": "Jun",
		        "visits": 1114,
		        "color": "#607d8b"
		    }, {
		        "country": "Jul",
		        "visits": 1284,
		        "color": "#cddc39"
		    }, {
		        "country": "Ago",
		        "visits": 1111,
		        "color": "#9c27b0"
		    }/*, {
		        "country": "Sep",
		        "visits": 1165,
		        "color": "#f44336"
		    }, {
		        "country": "Oct",
		        "visits": 1180,
		        "color": "#e91e63"
		    }, {
		        "country": "Nov",
		        "visits": 1143,
		        "color": "#3f51b5"
		    }, {
		        "country": "Dic",
		        "visits": 1141,
		        "color": "#607d8b"
		    }*/],
		    "valueAxes": [{
		        "position": "left",
		        "axisAlpha":0,
		        "gridAlpha":0
		    }],
		    "graphs": [{
		        "balloonText": "[[category]]: <b>[[value]]</b>",
		        "colorField": "color",
		        "fillAlphas": 0.85,
		        "lineAlpha": 0.1,
		        "type": "column",
		        "topRadius":1,
		        "valueField": "visits"
		    }],
		    "depth3D": 20,
			"angle": 30,
		    "chartCursor": {
		        "categoryBalloonEnabled": false,
		        "cursorAlpha": 0,
		        "zoomable": false
		    },
		    "categoryField": "country",
		    "categoryAxis": {
		        "gridPosition": "start",
		        "axisAlpha":0,
		        "gridAlpha":0

		    },
		    "export": {
		    	"enabled": true
		     }

		}, 0);
		
		var chartRendimientoVehiculosCombustible = AmCharts.makeChart("rendimientoVehiculosCombustible", {
			"type": "serial",
			  "addClassNames": true,
			  "theme": "chartVG",
			  "autoMargins": false,
			  "marginLeft": 65,
			  "marginRight": 8,
			  "marginTop": 10,
			  "marginBottom": 26,
			  "balloon": {
			    "adjustBorderColor": false,
			    "horizontalPadding": 20,
			    "verticalPadding": 8,
			    "color": "#ffffff"
			  },

			  "dataProvider": [ {
			    "year": "Torton (2 ejes)",
			    "income": 28000,
			    //"expenses": 25
			  }, {
			    "year": "Rabon (1 eje)",
			    "income": 20500,
			    //"expenses": 100
			  }, {
			    "year": "Cami\u00F3n de plataforma abierta",
			    "income": 35000,
			    //"expenses": 75
			  },{
			    "year": "Low boy/cama baja",
			    "income": 30900,
			    //"expenses": 50
			  },{
			    "year": "Jaula granel/granelera",
			    "income": 27000,
			    //"expenses": 400
			  }],
			  "valueAxes": [ {
			    "axisAlpha": 0,
			    "position": "left"
			  } ],
			  "startDuration": 1,
			  "graphs": [ {
			    "alphaField": "alpha",
			    "balloonText": "<span style='font-size:12px;'>[[title]] para [[category]]:<br><span style='font-size:20px;'>[[value]] MXN</span> [[additional]]</span>",
			    "fillAlphas": 1,
			    "title": "Ganancias Reportadas",
			    "type": "column",
			    "valueField": "income",
			    "dashLengthField": "dashLengthColumn"
			  }, {
			    "id": "graph2",
			    "balloonText": "<span style='font-size:12px;'>[[title]] de [[category]]:<br><span style='font-size:20px;'>[[value]] pqts</span> [[additional]]</span>",
			    "bullet": "round",
			    "lineThickness": 3,
			    "bulletSize": 7,
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#FFFFFF",
			    "useLineColorForBulletBorder": true,
			    "bulletBorderThickness": 3,
			    "fillAlphas": 0,
			    "lineAlpha": 1,
			    "title": "Excedente",
			    "valueField": "expenses",
			    "dashLengthField": "dashLengthLine"
			  } ],
			  "categoryField": "year",
			  "categoryAxis": {
			    "gridPosition": "start",
			    "axisAlpha": 0,
			    "tickLength": 0
			  },
			  "export": {
			    "enabled": true
			  }
		});
		
		/*$timeout(function() {
			initGraphCG();
		});*/
	};
	
	graficaUnidadesMantenimiento = function() {
		var unidadesMantenimiento = AmCharts.makeChart( "unidadesMantenimiento", {
			"type": "pie",
			  "theme": "donaMantto",
			  "dataProvider": [ {
			    "title": "Cami\u00F3n de plataforma abierta",
			    "value": 53
			  }, {
			    "title": "Rabon (1 eje)",
			    "value": 7
			  }, 
			  {
				  "title": "Torton (2 ejes)",
				  "value": 19
			  },
			  {
				  "title": "Jaula granel/granelera",
				  "value": 14
			  },
			  {
				  "title": "Low boy/cama baja",
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
	};
	
	graficaUnidadesMantenimiento();
		initController();
	
});