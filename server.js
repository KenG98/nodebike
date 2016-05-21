var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 8080;

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

http.listen(PORT);