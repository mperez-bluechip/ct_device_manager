var static = require('node-static');

var fileServer = new static.Server('./');

require('http').createServer(function (req, res) {
    req.addListener('end', function () {
        fileServer.serve(req, res, function (err, result) {
            if (err) { // There was an error serving the file
                console.error("Error serving " + req.url + " - " + err.message);

                // Respond to the client
                res.writeHead(err.status, err.headers);
                res.end();
            }
        });
    }).resume();
}).listen(3000);
