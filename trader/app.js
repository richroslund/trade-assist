#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('es6-symbol/implement');
require('babel-polyfill');
var program = require('commander');
var {getPrice, getBalance, trades, getAllSymbols, stats} = require('./dist/trader');
var _ = require('lodash');

let setupCommand = (cmdTxt, action) => {
  program.command(cmdTxt).action((...args) => action(...args));
}

program
  .command('price <ticker>')
  .action(function (crypto) {
    getPrice(crypto).then((res) => console.log(_.map(res,(v,k) => `${k}: ${v}`)));

  });
program
  .command('balance [ticker]')
  .action(function (crypto) {
    getBalance(crypto).then((res) => console.log(res));

  });

program
  .command('trades <ticker>')
  .action(function (ticker) {
    getAllSymbols(ticker)
      .then((tickers) => {
        trades(tickers, (trades) => {
          let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
          console.log(symbol+' trade update. price: '+price+', quantity: '+quantity+', maker: '+maker);
        });
      });
    

  });


setupCommand('stats <ticker> <interval>',(ticker, interval) => stats(ticker, interval));


program.parse(process.argv)
