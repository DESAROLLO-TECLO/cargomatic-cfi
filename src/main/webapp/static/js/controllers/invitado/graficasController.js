angular.module(appTeclo).controller('graficasController',function ($scope, $filter, $timeout, growl, showAlert, invitadoService){
	
	
	$scope.ctrls = [
		{myValue:1, nbPanel: "Realizadas", myTarget:100, myDuration:1500, bgPanel:'bg-aqua', icon: "fa-file-text-o", myEffect:'swing'},
		{myValue:2, nbPanel: "Pendientes", myTarget:20, myDuration:1500, bgPanel:'bg-yellow', icon: "fa-file-text-o", myEffect:'swing'},
		{myValue:3, nbPanel: "Completadas", myTarget:70, myDuration:1500, bgPanel:'bg-green', icon: "fa-file-text-o", myEffect:'swing'},
		{myValue:4, nbPanel: "Canceladas", myTarget:10, myDuration:1500, bgPanel:'bg-red', icon: "fa-file-text-o", myEffect:'swing'}
	];
	
	
	angular.element("#input-3").rating();
	angular.element(".caption").hide();
	angular.element(".clear-rating").hide();
	
	initCharts = function(){
		var solicitudesMensuales = AmCharts.makeChart("solicitudesMensuales", {
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
		
		var enviosPorRuta = AmCharts.makeChart("enviosPorRuta", {
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
	}
	
	initCharts();
});