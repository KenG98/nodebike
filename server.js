var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var PORT = 3000

http.listen(PORT, function () {
  console.log('Running on *:' + PORT);
});

app.use(express.static(__dirname + '/public'));

io.on('connection' , function(socket){
  console.log('New connection:' + socket.handshake.address.address + ' on socket ' + socket.id);

  socket.on('new mobile', function(data){
    console.log('new mobile');
  });

  socket.on('new display', function(data){
    console.log('new display');
  });




});