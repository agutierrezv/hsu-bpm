module.exports = {
    'security' : {
        'apiKey' : 'hsu01' // The key to explore the API DOCS and use it from third-party hosts
    },
    'webhooks' : {
    	'notify' : {
    		'baseUrl': 'hsu-api.herokuapp.com',
    		'port': 443,
    		'path': '/api/prestacionUpdateStatus/',
    		'method': 'post',
    		'authMode': 'www-basic',
    		'user': 'tramitador',
    		'password': 'hsu01'
    	}
    }
};