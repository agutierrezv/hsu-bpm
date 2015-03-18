angular.module('myApp').controller('EditTramiteController', ['$scope', '$routeParams', '$location', 'TramiteService', function($scope, $routeParams, $location, TramiteService) {

	function init() {
		$scope.tramite = {
			type : '', 
			origin : '', 
			originId : '', 
			created : new Date(0), 
			lastModified : new Date(0), 
			state : '', 
			description : '', 
			assignedTo : '' 
		
		};
		$scope.dataReceived = false;

		//Estados de tramites
		$scope.states = [
			'iniciado',
			'subsanación',
			'valoracion',
			'reclamación',
			'concedido',
			'denegado'
			];


		if($location.path() !== '/tramite/add') {
			TramiteService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.tramite = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}		
	}

	$scope.save = function () {
		if($location.path() === '/tramite/add') {
			TramiteService.add($scope.tramite).then(function () {
				$location.path('/tramite/');
			});
		} else {
			TramiteService.update($scope.tramite).then(function () {
				$location.path('/tramite/');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/tramite/');
	};

	init();

}]);
