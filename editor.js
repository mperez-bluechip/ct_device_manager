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


function connection(socket) {

	function disconnect() {
		console.log("disconnected");
	}

	function getmsg(msg) {
		io.sockets.emit("broadcast",msg);
	}

	function spy(move) {
		socket.broadcast.emit("spy",move);
	}

	socket.on("disconnect",disconnect);
	socket.on("msg",getmsg);
	socket.on("spy",spy);

	var intv = setInterval(function(){
		socket.emit("hello",Math.random());
	},1000);
}


var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 3000,
	host = "127.0.0.1",

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



// io.on('connection', function(socket) {
//
// 	function disconnect() {
// 		console.log("disconnected");
// 	}
//
// 	function getmsg(msg) {
// 		io.sockets.emit("broadcast",msg);
// 	}
//
// 	function spy(move) {
// 		socket.broadcast.emit("spy",move);
// 	}
//
// 	socket.on("disconnect",disconnect);
// 	socket.on("msg",getmsg);
// 	socket.on("spy",spy);
//
// 	var intv = setInterval(function(){
// 		socket.emit("hello",Math.random());
// 	},1000);
//
// });
//
// var
// 	http = require("http"),
// 	httpserv = http.createServer(handleHTTP),
//
// 	port = 3000,
// 	host = "127.0.0.1",
//
// 	ASQ = require("asynquence"),
// 	node_static = require("node-static"),
// 	io = require("socket.io").listen(httpserv)
// ;
//
// require("asynquence-contrib");
//
// // configure socket.io
// io.on("configure",function(){
// 	io.enable("browser client minification"); // send minified client
// 	io.enable("browser client etag"); // apply etag caching logic based on version number
// 	io.set("log level", 1); // reduce logging
// 	io.set("transports", [
// 		"websocket",
// 		"xhr-polling",
// 		"jsonp-polling"
// 	]);
// });
//
// httpserv.listen(port, host);
