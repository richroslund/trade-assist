var express = require('express');
var app = express();
var http = require('http')
const server = http.createServer(app)
var {getPrice, getBalance, trades, getAllSymbols, stats} = require('../trader/dist/trader');

var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/balance/:coin', async (req, res, coin) => {
  await getBalance(coin).then((bal) => res.send(bal));
  
});

server.listen(3030, function() {
  console.log('Example app listening on port 3030!');
});

io.on('connection', function (socket) {
  console.log("new client connected!");
  setInterval(
    () => getPrice("eth").then((p) => {
      console.log(p);
      socket.emit("price update", p)
    }),
    5000
  );
});