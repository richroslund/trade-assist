'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrice = exports.client = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var binance = require('node-binance-api');

require('dotenv').config();

var client = exports.client = function client() {
  binance.options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.API_SECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true // If you want to use sandbox mode where orders are simulated
  });
  return binance;
};

var getPrice = exports.getPrice = function getPrice(coin) {
  var id = _lodash2.default.upperCase(coin) + 'USDT';
  return new Promise(function (resolve, reject) {
    client().prices(id, function (error, ticker) {
      if (error) {
        reject(error);
      } else {
        resolve(ticker);
      }
    });
  });
};