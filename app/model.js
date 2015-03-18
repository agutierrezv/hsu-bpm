
//Data model for Backend-Services  ---------------

var mongoose = require('mongoose');
var XLSX = require('xlsx');

// Create Mongoose schemas
var TramiteSchema = new mongoose.Schema({ 
  type: { type: String, required: true },
	origin: { type: String, required: false },
	originId: { type: String, required: false },
	created: { type: Date, required: true },
	lastModified: { type: Date, required: true },
	state: { type: String, required: true },
	description: { type: String, required: false },
	assignedTo: { type: String, required: false }
});


//Internal setting -----
var ConfigSchemaInternal = new mongoose.Schema({ 
  key: { type: String, required: true },
  value: { type: String, required: false }
});


//Create full text indexes (experimental)--- 
/*
    TramiteSchema.index({
    	type: 'text',
		origin: 'text',
		originId: 'text',
		state: 'text',
		description: 'text',
		assignedTo: 'text'    
    });
*/


// Sample to inject operations into mongoose schemas
//TramiteSchema.pre('save', function (next) {
//  console.log('A Tramite was saved to MongoDB: %s.', this.get('type'));
//  next();
//});

var propertiesForClass = {
	"tramite" : ['type', 'origin', 'originId', 'created', 'lastModified', 'state', 'description', 'assignedTo']  
};


//Models ----
var TramiteModel = mongoose.model('tramite', TramiteSchema);
  

function getModelForClass(className) {
  if ('tramite'==className) {
    return TramiteModel;
  }
  
  return null;
}

var ConfigModelInternal = mongoose.model('_config', ConfigSchemaInternal);  


function getCsvHeader(className) {
  var res="_id"; prefix=",";
  var props = propertiesForClass[className];
  if (props) {
    for(var index in props) {
      res += prefix + csvEncode(props[index]);
    }
    return res+"\r\n";
  }
  return null;
}
function toCsv(objects, className) {
  var res = 'sep=,\r\n' + getCsvHeader(className);
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += item._id;
      var prefix = ",";
      for(var index in props) {
        res += prefix + csvEncode(item[props[index]]);
      }
      res +="\r\n";
    }
  }
  return res;
}
function isObjectId(obj) {
  return (typeof obj === 'object' && obj._bsontype === 'ObjectID');
}
function csvEncode(data) {
  var text;
  if (data == null) {
    return '';
  }
  if (isObjectId(data)) {
    return data.toString();
  }
  text = data.toString();
  
  if ((text.indexOf(',') >= 0) || (text.indexOf('.') >= 0) || (text.indexOf(' ') >= 0)) {
    return '"' + text + '"';
  }   
  return text;
}

function toXml(objects, className) {
  var res = '<?xml version="1.0" encoding="UTF-8"?>\r\n<data>\r\n';
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += '  <' + className + '><id>' + item._id + '</id>';
      for(var index in props) {
        var prop = props[index];
        res += '<'+ prop + '>' + xmlEncode(item[prop]) + '</' + prop + '>';
      }
      res +='</' + className + '>\r\n';
    }
  }
  return res + "</data>\r\n";
}
function xmlEncode(data) {
  if (data == null) {
    return '';
  }
  var res = data.toString().replace(/&/g, '&amp;')
                .replace(/'/g, '&apos;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
  ;
  return res;
}

function toXlsx(objects, className) {
  var ws_name = className;
  var wb = {
    SheetNames: [],
    Sheets: {}
  };

  var properties = propertiesForClass[className];

  var data = [];
  //add labels
  var headers = [ "_id" ];
  for(var z in properties) {
    headers.push(properties[z]);
  }
  data.push(headers);

  for(var i in objects) {
    var row = objects[i];
    var rowItem = [ row._id ];

    for(var key in properties) {
      var value = row[properties[key]];
      rowItem.push(value);
    }
    data.push(rowItem);
  }
  
  var ws = sheetFromArrayOfArrays(data);
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbbuf = XLSX.write(wb, { type: 'buffer' });
  return wbbuf;
} 
 
function sheetFromArrayOfArrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) { range.s.r = R; }
      if(range.s.c > C) { range.s.c = C; }
      if(range.e.r < R) { range.e.r = R; }
      if(range.e.c < C) { range.e.c = C; }
      var cell = {v: data[R][C] };
      if(cell.v == null) { continue; }
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
      
      if(typeof cell.v === 'number') { cell.t = 'n'; }
      else if(typeof cell.v === 'boolean') { cell.t = 'b'; }
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else {
        cell.t = 's';
      }      
      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  return ws;
}

function datenum(v, date1904) {
  if(date1904) {
    v+=1462;
  }
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

// Register the schema and export it
module.exports.TramiteModel    = TramiteModel;

module.exports.ConfigModelInternal    = ConfigModelInternal;

module.exports.getModelForClass = getModelForClass;
module.exports.toCsv = toCsv;
module.exports.toXlsx = toXlsx;
module.exports.toXml = toXml;
