const s = require('node-static')

const file = new s.Server('/')

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    //
    // Serve files!
    //
    file.serve(request, response);
  }).resume();
}).listen(8080);