angular.module(appTeclo)
.service('loginService',
function($rootScope,$http,$localStorage,$window,$q,$route,
		storageService,config) {
	
	var app = "/dataTmp/aplicacion";
	
	this.getUsers = function() {
		return $http.get(config.baseUrl+app+"/usuarios.json");
	}
	
	this.login = function(listUsers, user) {
		
		var response = {token:"",message:""};
		var token = undefined;
		var message = undefined;
		
		angular.forEach(listUsers, function(u, key) {
			if(u.usuario === user.username && u.clave === user.password) {
				token = generateToken(u);
			}
			if(token !== undefined) {
				response = {token:token,message:undefined};
			} else {
				response = {token:undefined,message:"Usuario o contraseña incorrecto"};
			}
		});
		
		return response;
	};
	
	this.logout = function() {
		
		storageService.setStatusAlert(false);
		storageService.deleteStorage($rootScope.stg.tokenName);
		storageService.deleteStorage($rootScope.stg.statusAlertName);
		storageService.deleteStorage($rootScope.stg.lastRequestName);
		storageService.deleteStorage($rootScope.stg.configApp);
		storageService.deleteStorage($rootScope.stg.configAppTmp);
		storageService.deleteStorage($rootScope.stg.abtBs);
		
		delete $rootScope.stg;
		delete $rootScope.menuDinamico;
		
		$rootScope.comprobarStorage();
		$q.when();
	};
	
	this.safeApply = function(fn) {
		var $root = $rootScope,
			phase = $root.$$phase;
    	
    	if(phase == '$apply' || phase == '$digest') {
    		if(fn && (typeof(fn) === 'function')) {
    			fn();
    		}
    	} else {
    		$apply(fn);
    	}
	}
	
	generateToken = function(user) {
		
		let header = {
				"alg": "HS512",
				"typ": "JWT"
			};
		
		let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
		let encodedHeader = base64url(stringifiedHeader);
		let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(user));
		let encodedData = base64url(stringifiedData);
		let token = encodedHeader + "." + encodedData;
		let secret = "demoTeclo";
		let signature = CryptoJS.HmacSHA512(token, secret);
		
		signature = base64url(signature);
		
		let signedToken = token + "." + signature;
		
		return signedToken;
	}
	
	base64url = function (source) {
		
		let encodedSource = CryptoJS.enc.Base64.stringify(source);
		
		encodedSource = encodedSource.replace(/=+$/, '');
		encodedSource = encodedSource.replace(/\+/g, '-');
		encodedSource = encodedSource.replace(/\//g, '_');
		
		return encodedSource;
	}
});