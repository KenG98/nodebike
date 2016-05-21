var PORT = 8080;

var io = require('socket.io').listen(PORT);


io.on('connection', function(socket) {
  console.log('New connection from ' + socket.handshake.address.address + ' on socket ' + socket.id);

});
