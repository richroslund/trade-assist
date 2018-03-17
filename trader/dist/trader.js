'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBalance = exports.getPrice = exports.client = undefined;

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

var balance = function balance() {
  return new Promise(function (res, rej) {
    console.log('balance');
    client().balance(function (err, balances) {
      if (err) return rej(err);else return res(balances);
    });
  });
};

var getPrice = exports.getPrice = function getPrice(coin) {
  var id = _lodash2.default.upperCase(coin);
  return new Promise(function (resolve, reject) {
    client().prices(function (error, ticker) {
      if (error) {
        reject(error);
      } else {
        var tickerPrices = _lodash2.default.reduce(ticker, function (res, val, key) {
          if (_lodash2.default.startsWith(key, id)) res[key] = val;
          return res;
        }, {});
        resolve(tickerPrices);
      }
    });
  });
};

var getBalance = exports.getBalance = function getBalance(coin) {
  return balance().then(function (balances) {
    if (_lodash2.default.isArray(coin)) return (0, _lodash2.default)(coin).map(function (c) {
      return _lodash2.default.find(balances, function (v, k) {
        return k === c;
      });
    });
    if (_lodash2.default.isString(coin)) return _lodash2.default.find(balances, function (v, k) {
      return k === coin;
    });
    return _lodash2.default.reduce(balances, function (res, val, key) {
      if (parseInt(val.available) + parseInt(val.onOrder) > 0) res[key] = val;
      return res;
    }, {});
  });
};