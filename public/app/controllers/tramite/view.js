angular.module('myApp').controller('ViewTramiteController', ['$scope', '$routeParams', '$location', 'TramiteService', function($scope, $routeParams, $location, TramiteService) {

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

		TramiteService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.tramite = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/tramite/');
	};	
	$scope.edit = function (event) {
		$location.path('/tramite/edit/' + $scope.tramite._id );
	};

	init();

}]);
