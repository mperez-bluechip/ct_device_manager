var static = require('node-static');

var fileServer = new static.Server('./');

require('http').createServer(function (req, res) {
    req.addListener('end', function () {
      fileServer.serve(req, res, function (e, res) {
                  if (e && (e.status === 404)) { // If the file wasn't found
                      fileServer.serveFile('/not-found.html', 404, {}, req, res);
                  }
              });
    }).resume();
}).listen(3000);
