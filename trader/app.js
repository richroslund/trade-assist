#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var {getPrice, getBalance} = require('./dist/trader');
var _ = require('lodash');


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

program.parse(process.argv)
