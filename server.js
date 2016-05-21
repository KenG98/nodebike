var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var PORT = 3000;

server.listen(PORT, function () {
  console.log('Running on *:' + PORT);
});

app.use(express.static(__dirname + '/public'));

app.get('/mob', function(req, res){
	res.sendFile(__dirname + '/public/display/index.html');
})


io.on('connection' , function(socket){
  console.log('New connection:' + socket.id);
});