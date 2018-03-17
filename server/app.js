var express = require('express');
var app = express();
var {getPrice, getBalance, trades, getAllSymbols, stats} = require('../trader/dist/trader');

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/balance/:coin', async (req, res, coin) => {
  await getBalance(coin).then((bal) => res.send(bal));
  
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});