var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var PORT = 3000

var games = [];



http.listen(PORT, function () {
  console.log('Running on *:' + PORT);
});

app.use(express.static(__dirname + '/public'));

io.on('connection' , function(socket){
  console.log('New connection on socket ' + socket.id);

  socket.on('disconnect', function(){
    console.log('Disconnection.');
  });

  socket.on('new mobile', function(data){
    io.to(games[0].display).emit('new mobile', data);
  });

  socket.on('new display', function(data){
    console.log('new display');
    newDisplay(socket);
  });

  socket.on('update', function(data){
    io.to(games[0].display).emit('update', data);
  });

});

function newDisplay(socket){
  games[0] = {
    display: socket.id,
  };
  games.players = {};
}

function newMobile(socket){
  games[0].players[socket.id] = {};
}
