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

// Read and retrieve JSON data

function readFile(jsonFile){
	return ASQ(function(done){
		var stream = fs.createReadStream(jsonFile);
		var contents = require("./json/editor.json");
		// stream.pipe(fs.createWriteStream(jsonFile+"backup"));
		stream.on("data", function(chunk){
			contents += chunk;
		});
		stream.on("end", function(){
			var ctDevs = JSON.parse(body);
			readFile("devices");
			console.log(ctDevs.devices);
		});
	});
		stream.on("error", function(err){
			console.error(error.message);
		})
}

// Use socket.io to to retrieve user text input and parse to DOM
function connection(socket) {

	function disconnect() {
		console.log("disconnected");
	}

	function getmsg(msg) {
		io.sockets.emit("broadcast",msg);
	}


	socket.on("disconnect",disconnect);
	socket.on("msg",getmsg);

}


var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 3000,
	host = "127.0.0.1",
	fs = require("fs");
	ASQ = require("asynquence"),
	node_static = require("node-static"),
	static_files = new node_static.Server(__dirname),

	io = require("socket.io").listen(httpserv)
;

require("asynquence-contrib");

// configure socket.io
io.on("configure",function(){
	io.enable("browser client minification"); // send minified client
	io.enable("browser client etag"); // apply etag caching logic based on version number
	io.set("log level", 1); // reduce logging
	io.set("transports", [
		"websocket",
		"xhr-polling",
		"jsonp-polling"
	]);
});

httpserv.listen(port, host);

io.on("connection",connection);
