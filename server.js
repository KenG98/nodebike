var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var PORT = 3000;

var games = [];



http.listen(PORT, function () {
  console.log('Running on *:' + PORT);
});

app.use(express.static(__dirname + '/public'));

io.on('connection' , function(socket){
  console.log('New connection on socket ' + socket.id);

  socket.on('new mobile', function(data){
    if(typeof games[0] == 'undefined'){
      console.log("No display: " + socket.id);
      io.to(socket.id).emit('no display');
    } else {
      console.log("New mobile: " + socket.id);
      newMobile(socket);
      io.to(games[0].display).emit('new mobile', data);
    }
  });

  socket.on('new display', function(data){
    console.log('New display: ' + socket.id);
    newDisplay(socket);
  });

  socket.on('start game', function(){
    console.log('Start Game: ' + socket.id)
    io.to('room ' + '0').emit('start game');
  });
  socket.on('update color', function(data){
    console.log('Update color: ' + id);
    io.to(data.id).emit('update color', data);
  });

  socket.on('update', function(data){
    console.log('Update: ' + socket.id)
    io.to(games[0].display).emit('update', data);
  });

  socket.on('disconnect', function(){
    console.log('Disconnect: ' + socket.id);
    disconnect(socket);
  });
});

function newDisplay(socket){
  games[0] = {
    display: socket.id,
  };
  games[0].players = {};
  socket.join('room ' + '0');
}
function disconnect(socket){
  for(var i in games){
    if (games[i].display == socket.id){
      console.log("Display quit: " + socket.id);
    } else {
      for(var player in games[i].players){
        if(player == socket.id){
          console.log("Player quit: " + socket.id);
          io.to(games[i].display).emit('player left', {id: socket.id});
        }
      }
    }
  }
}

function newMobile(socket){
  games[0].players[socket.id] = {};
  socket.join('room ' + '0');
}
