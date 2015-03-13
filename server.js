// Heroku defines the environment variable PORT, and requires the binding address to be 0.0.0.0
//var host = process.env.PORT ? '0.0.0.0' : '10.207.64.173';
var host = process.env.PORT ? '0.0.0.0' : '10.4.65.165';
var port = process.env.PORT || 1337;

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
        'cookie',
        'cookie2',
        // Strip Heroku-specific headers
        'x-heroku-queue-wait-time',
        'x-heroku-queue-depth',
        'x-heroku-dynos-in-use',
        'x-request-start'
    ],
    httpProxyOptions: {
        // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
        xfwd: false
    }
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
