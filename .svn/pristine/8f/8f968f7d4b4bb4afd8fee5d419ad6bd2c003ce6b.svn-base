angular.module(appTeclo).controller("evaluacionController",
function($scope, $filter, $controller, showAlert, proveedoresService, cotizacionesService, rutasService, WizardHandler, folio) {
	
	$scope.suppliers = [];
	$scope.filter = {folio:''};
	$scope.flags = {stepOne:true, stepTwo:false, stepThree:false, back: false, clas:'col-xs-1', clas2:'centerRow center'}
	
	rutasService.setFlag(true);
	
	initialData = function(){
//		cotizacionesService.obtenerDatosCotiza().success(function(data) {
//			$scope.suppliers = data.proveedor;
//			
//		}).error(function(data) {
//			
//		});
		$scope.filter.folio = folio;
		
	}
	
	$scope.saveStepOne = function(){
		var wizardEvaluacion = WizardHandler.wizard('wizardEvaluacion');
		$scope.flags.stepOne = false;
		$scope.flags.stepTwo = true;
		$scope.flags.clas = 'col-xs-12 col-md-2';
		$scope.flags.clas2 = 'centerRow';
		wizardEvaluacion.next();
	}
	
	$scope.saveStepTwo = function(){
		var wizardEvaluacion = WizardHandler.wizard('wizardEvaluacion');
		$scope.flags.stepTwo = false;
		$scope.flags.stepThree = true;
		wizardEvaluacion.next();
	}
	
	$scope.saveStepThree = function(){
		var wizardEvaluacion = WizardHandler.wizard('wizardEvaluacion');
		$scope.filter = {folio:''};
		wizardEvaluacion.next();
	}
	
	$scope.saveWizard = function(){
		showAlert.aviso("Evaluación guardada correctamente", null);
		$scope.flags.stepOne = false;
		$scope.flags.stepTwo = false;
		$scope.flags.stepThree = false;
		$scope.flags.back = true;
		var wizardEvaluacion = WizardHandler.wizard('wizardEvaluacion');
		wizardEvaluacion.reset();
		window.location = "#/operacionesConsulta"
	}
	
	$scope.previous = function(){
		var wizardEvaluacion = WizardHandler.wizard('wizardEvaluacion');
		if($scope.flags.stepThree){
			$scope.flags.stepTwo = true;
			$scope.flags.stepThree = false;
		}else if($scope.flags.stepTwo){
			$scope.flags.stepOne = true;
			$scope.flags.stepTwo = false;
		}
		wizardEvaluacion.previous();
	}
	
	initialData();
});