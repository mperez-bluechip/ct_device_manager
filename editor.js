var static = require('node-static');

var fileServer = new static.Server('./');

function handleHTTP(req,res) {
	    req.addListener('end', function () {
	        fileServer.serve(req, res, function (err, result) {
	            if (err) { // There was an error serving the file
	                console.error("Error serving " + req.url + " - " + err.message);

	                // Respond to the client
	                res.writeHead(err.status, err.headers);
	                res.end();
	            }
					});
	   });
		 req.resume();
}


var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 3000,
	host = "127.0.0.1",

	ASQ = require("asynquence"),
	node_static = require("node-static"),
	io = require("socket.io").listen(httpserv)
;

require("asynquence-contrib");

httpserv.listen(port, host);



io.on('connection', function(socket) {
		clearInterval(intv);
    console.log('Client connected.');

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });

		socket.on("typeit",function(msg){
			socket.broadcast.emit("messages", msg);
		});

		var intv = setInterval(function(){
			socket.emit("hello", Math.random());
		},1000);
});
