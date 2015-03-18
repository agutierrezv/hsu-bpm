angular.module('myApp').controller('DeleteTramiteController', ['$scope', '$routeParams', '$location', 'TramiteService', function($scope, $routeParams, $location, TramiteService) {

	function init() {
		$scope.tramite = {};
		$scope.dataReceived = false;

		if($location.path() !== '/tramite/delete') {
			TramiteService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.tramite = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		TramiteService.delete($scope.tramite._id).then(function () {
			$location.path('/tramite/');
		});
	};

	$scope.cancel = function () {
		$location.path('/tramite/');
	};

	init();

}]);
