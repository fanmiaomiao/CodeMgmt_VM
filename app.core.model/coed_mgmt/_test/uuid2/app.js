/**
 * Created by miaomiao on 2016/3/2.
 */
var http = require("http");
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
var port = normalizePort(process.env.PORT);
http.createServer(function (request, response) {

    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Hello World at ' + port);
}).listen(port);

// Console will print the message
console.log('Server running at http://127.0.0.1:'+port);

setInterval(function(){
    console.log('----from ' + port + ': ' + new Date());
}, 1000);
