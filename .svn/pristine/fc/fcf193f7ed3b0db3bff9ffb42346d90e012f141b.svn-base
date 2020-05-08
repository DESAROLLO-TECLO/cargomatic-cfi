angular.module(appTeclo).controller('dashboardProveedoresController',function($scope, $filter, $timeout, ModalService, cotizacionesService) {

	$scope.suppliers = [];
	$scope.filter = {};
	
	$scope.ctrls = 
		[
			{myValue:1, nbPanel: "Pendientes por Cargar", myTarget:200, myDuration:1500, bgPanel:'bg-aqua', icon: "fa-dropbox", myEffect:'swing'},
			{myValue:2, nbPanel: "Pendientes de Entrega", myTarget:20, myDuration:1500, bgPanel:'bg-yellow', icon: "fa-paper-plane", myEffect:'swing'},
			{myValue:3, nbPanel: "En Tránsito", myTarget:500, myDuration:1500, bgPanel:'bg-green', icon: "fa-address-card-o", myEffect:'swing'},
			{myValue:4, nbPanel: "No Entregados", myTarget:200, myDuration:1500, bgPanel:'bg-red', icon: "fa-car", myEffect:'swing'}
		];
	
	$scope.tabCombustible = true;
	$scope.tabGastos = false;
	
	$scope.tabs = [
		{idTab: 1, nbTab: 'Asignado vs No Entregado', isActive: true},
		{idTab: 1, nbTab: '', isActive: false}
	]
	
	$scope.changeGraph = function(tab) {
		switch (tab) {
		case 'Gastos':
			$scope.tabs[0].isActive = false;
			$scope.tabs[1].isActive = true;
			$scope.tabGastos = true;
			$scope.tabCombustible = false;
			$timeout(function() {
				initGraphCG();
			});
			break;
		case 'Combustible':
			$scope.tabs[1].isActive = false;
			$scope.tabs[0].isActive = true;
			$scope.tabGastos = false;
			$scope.tabCombustible = true;
			$timeout(function() {
				initGraphCG();
			});
			break;
		default:
			break;
}
	}
	
	initController = function() {
		var entregaPaquetes = AmCharts.makeChart("entregaPaquetes", {
		    "theme": "light",
		    "type": "serial",
		    "startDuration": 2,
		    "dataProvider": [{
		        "country": "Ene",
		        "visits": 3225,
		        "color": "#009688"
		    }, {
		        "country": "Feb",
		        "visits": 1882,
		        "color": "#4caf50"
		    }, {
		        "country": "Mar",
		        "visits": 2809,
		        "color": "#8bc34a"
		    }, {
		        "country": "Abr",
		        "visits": 4025,
		        "color": "#3f51b5"
		    }, {
		        "country": "May",
		        "visits": 5122,
		        "color": "#00bcd4"
		    }, {
		        "country": "Jun",
		        "visits": 3114,
		        "color": "#607d8b"
		    }, {
		        "country": "Jul",
		        "visits": 1984,
		        "color": "#cddc39"
		    }, {
		        "country": "Ago",
		        "visits": 4711,
		        "color": "#9c27b0"
		    }, {
		        "country": "Sep",
		        "visits": 5665,
		        "color": "#f44336"
		    }, {
		        "country": "Oct",
		        "visits": 3580,
		        "color": "#e91e63"
		    }, {
		        "country": "Nov",
		        "visits": 4443,
		        "color": "#3f51b5"
		    }, {
		        "country": "Dic",
		        "visits": 5441,
		        "color": "#607d8b"
		    }],
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
		
		var cartGastoAcumuladoMensual = AmCharts.makeChart("gastoAcumuladoMensual", {
			"theme": "light",
		    "type": "serial",
			"startDuration": 2,
		    "dataProvider": [{
		        "country": "Ene",
		        "visits": 3025,
		        "color": "#607d8b"
		    }, {
		        "country": "Feb",
		        "visits": 2882,
		        "color": "#3f51b5"
		    }, {
		        "country": "Mar",
		        "visits": 1809,
		        "color": "#cddc39"
		    }, {
		        "country": "Abr",
		        "visits": 5322,
		        "color": "#00bcd4"
		    }, {
		        "country": "May",
		        "visits": 5122,
		        "color": "#2196f3"
		    }, {
		        "country": "Jun",
		        "visits": 5114,
		        "color": "#009688"
		    }, {
		        "country": "Jul",
		        "visits": 1984,
		        "color": "#4caf50"
		    }, {
		        "country": "Ago",
		        "visits": 4711,
		        "color": "#607d8b"
		    }, {
		        "country": "Sep",
		        "visits": 3665,
		        "color": "#673ab7"
		    }, {
		        "country": "Oct",
		        "visits": 4580,
		        "color": "#03a9f4"
		    }, {
		        "country": "Nov",
		        "visits": 4443,
		        "color": "#f44336"
		    }, {
		        "country": "Dic",
		        "visits": 3441,
		        "color": "#3f51b5"
		    }],
		    "graphs": [{
		        "balloonText": "[[category]]: <b>[[value]]</b>",
		        "fillColorsField": "color",
		        "fillAlphas": 1,
		        "lineAlpha": 0.1,
		        "type": "column",
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
		        "labelRotation": 0
		    },
		    "export": {
		    	"enabled": true
		     }

		});
		
		$timeout(function() {
			initGraphCG();
		});
	};
	
	initGraphCG = function() {
		var chartRendimientoVehiculosCombustible = AmCharts.makeChart("rendimientoVehiculosCombustible", {
			"type": "serial",
			  "addClassNames": true,
			  "theme": "chartVG",
			  "autoMargins": false,
			  "marginLeft": 35,
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
			    "year": "CFI Drive",
			    "income": 113,
			    "expenses": 95
			  }, {
			    "year": "Solutions Cargo",
			    "income": 253,
			    "expenses": 100
			  }, {
			    "year": "Tampiqueños S.A de C.V",
			    "income": 350,
			    "expenses": 75
			  },{
			    "year": "Fletes Mylsa",
			    "income": 574,
			    "expenses": 560
			  },{
			    "year": "SE Global Logistics S.A de C.V",
			    "income": 332,
			    "expenses": 400
			  }],
			  "valueAxes": [ {
			    "axisAlpha": 0,
			    "position": "left"
			  } ],
			  "startDuration": 1,
			  "graphs": [ {
			    "alphaField": "alpha",
			    "balloonText": "<span style='font-size:12px;'>[[title]] [[category]]:<br><span style='font-size:20px;'>[[value]] envíos</span> [[additional]]</span>",
			    "fillAlphas": 1,
			    "title": "Viajes de ",
			    "type": "column",
			    "valueField": "income",
			    "dashLengthField": "dashLengthColumn"
			  }, {
			    "id": "graph2",
			    "balloonText": "<span style='font-size:12px;'>[[title]] [[category]]:<br><span style='font-size:20px;'>[[value]] envíos</span> [[additional]]</span>",
			    "bullet": "round",
			    "lineThickness": 3,
			    "bulletSize": 7,
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#FFFFFF",
			    "useLineColorForBulletBorder": true,
			    "bulletBorderThickness": 3,
			    "fillAlphas": 0,
			    "lineAlpha": 1,
			    "title": "Planeación de viajes para ",
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
		
		var chartRendimientoVehiculosGastos = AmCharts.makeChart("rendimientoVehiculosGastos", {
			"type": "serial",
			  "addClassNames": true,
			  "theme": "chartVG",
			  "autoMargins": false,
			  "marginLeft": 45,
			  "marginRight": 8,
			  "marginTop": 10,
			  "marginBottom": 26,
			  "balloon": {
			    "adjustBorderColor": false,
			    "horizontalPadding": 10,
			    "verticalPadding": 8,
			    "color": "#ffffff"
			  },

			  "dataProvider": [ {
			    "year": "Unidad-1",
			    "income": 6000,
			    "expenses": 8000
			  }, {
			    "year": "Unidad-3",
			    "income": 3000,
			    "expenses": 3500
			  }, {
			    "year": "Unidad-4",
			    "income": 3500,
			    "expenses": 5600
			  }, {
			    "year": "Unidad-5",
			    "income": 5000,
			    "expenses": 6000
			  }, {
			    "year": "Unidad-6",
			    "income": 4500,
			    "expenses": 5000
			  },
			  {
				"year": "Unidad-7",
				"income": 3800,
				"expenses": 4000
			  },
			  {
				"year": "Unidad-8",
				"income": 3200,
				"expenses": 5000
			  },
			  {
				"year": "Unidad-9",
				"income": 4600,
				"expenses": 4700
			  },
			  {
				"year": "Unidad-10",
				"income": 2200,
				"expenses": 3000
			  }],
			  "valueAxes": [ {
			    "axisAlpha": 0,
			    "position": "left"
			  } ],
			  "startDuration": 1,
			  "graphs": [ {
			    "alphaField": "alpha",
			    "balloonText": "<span style='font-size:12px;'>[[title]] en [[category]]:<br><span style='font-size:20px;'>$[[value]] MXN</span> [[additional]]</span>",
			    "fillAlphas": 1,
			    "title": "Consumo planeado",
			    "type": "column",
			    "valueField": "income",
			    "dashLengthField": "dashLengthColumn"
			  }, {
			    "id": "graph2",
			    "balloonText": "<span style='font-size:12px;'>[[title]] en [[category]]:<br><span style='font-size:20px;'>$[[value]] MXN</span> [[additional]]</span>",
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
		
		var chart = AmCharts.makeChart("reatingProveedores",
				{
				    "type": "serial",
				    "theme": "light",
				    "dataProvider": [{
				        "name": "CFI Drive",
				        "points": 10,
				        "color": "#33cc33",
				        "bullet": "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/72/Actions-rating-icon.png"
				    }, {
				        "name": "Tampiqueños S.A de C.V",
				        "points": 5,
				        "color": "#ff6600",
				        "bullet": "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/72/Actions-rating-icon.png"
				    }, {
				        "name": "Fletes Mylsa",
				        "points": 7,
				        "color": "#ffff00",
				        "bullet": "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/72/Actions-rating-icon.png"
				    }, {
				        "name": "Solutions Cargo",
				        "points": 3,
				        "color": "#ff0000",
				        "bullet": "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/72/Actions-rating-icon.png"
				    },
				    {
				        "name": "SE Global Logistics S.A de C.V",
				        "points": 4,
				        "color": "#1e0bff",
				        "bullet": "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/72/Actions-rating-icon.png"
				    }
				    
				    ],
				    "valueAxes": [{
				        "maximum": 11,
				        "minimum": 0,
				        "axisAlpha": 0,
				        "dashLength": 4,
				        "position": "left"
				    }],
				    "startDuration": 1,
				    "graphs": [{
				        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
				        "bulletOffset": 10,
				        "bulletSize": 52,
				        "colorField": "color",
				        "cornerRadiusTop": 8,
				        "customBulletField": "bullet",
				        "fillAlphas": 0.8,
				        "lineAlpha": 0,
				        "type": "column",
				        "valueField": "points"
				    }],
				    "marginTop": 0,
				    "marginRight": 0,
				    "marginLeft": 0,
				    "marginBottom": 0,
				    "autoMargins": false,
				    "categoryField": "name",
				    "categoryAxis": {
				        "axisAlpha": 0,
				        "gridAlpha": 0,
				        "inside": true,
				        "tickLength": 0
				    },
				    "export": {
				    	"enabled": true
				     }
				});
		
		cotizacionesService.obtenerDatosCotiza().success(function(data) {
			$scope.suppliers = data.proveedor;
		}).error(function(data) {
			
		});
		
	}
	
	initController();
});
