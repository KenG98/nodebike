var express = require('express');

var PORT = 3000;

var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);