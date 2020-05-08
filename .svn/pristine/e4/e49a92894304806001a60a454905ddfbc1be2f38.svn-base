angular.module(appTeclo).constant("constante", {
	urlWs : "/prototipo_cfi_ctlrutas"
});

angular.module(appTeclo)
	.factory('config', [ '$http', '$location', 'constante', '$rootScope',
		function($http, $location, constante, $rootScope) {

			let protocol = $location.protocol() + "://";
			let host = location.host;
			let absUrl = $location.absUrl();
			let contextApp = absUrl.split("/")[3];

			let url = protocol + host + "/" + contextApp;

			return {
				baseUrl : url,
				absUrl : absUrl,
				contextApp : contextApp
			}
		}
	]);