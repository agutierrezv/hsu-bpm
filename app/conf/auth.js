module.exports = {
    'security' : {
        'apiKey' : 'AyHsu01' // The key to explore the API DOCS and use it from third-party hosts
    },
    'webhooks' : {
    	'notify' : {
    		'baseUrl': 'hsu.herokuapp.com',
    		'port': 443,
    		'path': '/api/prestacionUpdateStatus/',
    		'method': 'post',
    		'authMode': 'www-basic',
    		'user': 'tramitador',
    		'password': 'AyHsu01'
    	}
    }
};
