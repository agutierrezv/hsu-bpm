//Create test data for backend services
var mongoose = require('mongoose');

var models = require('./model');

var dbName = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/DemoDb';
mongoose.connect(dbName);


// Clear the database of old data
mongoose.model('tramite').remove(function (error) {
  if (error) {
  	throw error;
  }
});

console.log('Data deleted on: ' + dbName);

// Put the fresh data in the database
//Data for Tramite ---------------------------
console.log('  Creating data for  Tramite.');

mongoose.model('tramite').create( {
		type: 'Type0',
		origin: 'Origin1',
		originId: 'OriginId2',
		created: '2014.03.31',
		lastModified: '2014.03.31',
		state: 'State5',
		description: 'Description6',
		assignedTo: 'AssignedTo7'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('tramite').create( {
		type: 'Type8',
		origin: 'Origin9',
		originId: 'OriginId10',
		created: '2014.03.31',
		lastModified: '2014.03.31',
		state: 'State13',
		description: 'Description14',
		assignedTo: 'AssignedTo15'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('tramite').create( {
		type: 'Type16',
		origin: 'Origin17',
		originId: 'OriginId18',
		created: '2014.03.31',
		lastModified: '2014.03.31',
		state: 'State21',
		description: 'Description22',
		assignedTo: 'AssignedTo23'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('tramite').create( {
		type: 'Type24',
		origin: 'Origin25',
		originId: 'OriginId26',
		created: '2014.03.31',
		lastModified: '2014.03.31',
		state: 'State29',
		description: 'Description30',
		assignedTo: 'AssignedTo31'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('tramite').create( {
		type: 'Type32',
		origin: 'Origin33',
		originId: 'OriginId34',
		created: '2014.03.31',
		lastModified: '2014.03.31',
		state: 'State37',
		description: 'Description38',
		assignedTo: 'AssignedTo39'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);

console.log('Fake Data created on: ' + dbName);
