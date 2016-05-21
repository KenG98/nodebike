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

  socket.on('new mobile', function(data){
    if(typeof games[0] == 'undefined'){
      console.log("no display");
      io.to(socket.id).emit('no display');
    } else {
      console.log("new mobile");
      newMobile(socket);
      io.to(games[0].display).emit('new mobile', data);
    }
  });

  socket.on('new display', function(data){
    console.log('new display');
    newDisplay(socket);
  });

  socket.on('start game', function(data){
    io.emit('start game', data);
  })
  socket.on('update', function(data){
    io.to(games[0].display).emit('update', data);
  });

  socket.on('disconnect', function(){
    console.log('Disconnection.');
    disconnect(socket);
  });
});

function newDisplay(socket, gameId=0){
  games[gameId] = {
    display: socket.id,
  };
  games[gameId].players = {};
  socket.join()
}
function disconnect(socket){
  for(var i in games){
    if (games[i].display == socket.id){
      console.log("display quit");
    } else {
      for(var player in games[i].players){
        if(player == socket.id){
          console.log("player quit");
          io.to(games[i].display).emit('player left', {id: socket.id})
        }
      }
    }
  }
}

function newMobile(socket, gameId = 0){
  games[gameId].players[socket.id] = {};
}
