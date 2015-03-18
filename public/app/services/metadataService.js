angular.module('myApp').service('MetadataService', [function () {
	var MetadataService = {};


	var metaData = {
		"tramite" 		: 	["type","origin","originId","created","lastModified","state","description","assignedTo"]
	};

	MetadataService.getPropertiesFor = function (className) {
		return (metaData[className] || [] ).slice(0);
	};

	return MetadataService;

}]);

