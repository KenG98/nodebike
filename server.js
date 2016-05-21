var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 3000

app.listen(PORT, function () {
  console.log('Running on *:' + PORT);
});

app.use(express.static(__dirname + '/public'));


io.on('connection' , function(socket){
  console.log('New connection:' + socket.handshake.address.address + ' on socket ' + socket.id);
});