#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var {getPrice} = require('./dist/trader');



program
  .command('price <crypto>')
  .action(function (crypto) {
    getPrice(crypto).then((res) => console.log(res));
  });

program.parse(process.argv)
