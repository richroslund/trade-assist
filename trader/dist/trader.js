'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = exports.trades = exports.getBalance = exports.getPrice = exports.getAllSymbols = exports.client = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-symbol/implement');
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
    client().balance(function (err, balances) {
      if (err) return rej(err);else return res(balances);
    });
  });
};

var getAllSymbols = exports.getAllSymbols = function getAllSymbols(match) {
  return new Promise(function (res, rej) {
    client().prices(function (err, prices) {
      if (err) rej(err);else {
        var results = (0, _lodash2.default)(prices).map(function (v, k) {
          return k;
        });
        if (_lodash2.default.isString(match)) results = results.filter(function (k) {
          return _lodash2.default.startsWith(_lodash2.default.toLower(k), _lodash2.default.toLower(match));
        });
        res(results.value());
      }
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

var trades = exports.trades = function trades(tickers, tickerCallback) {
  client().websockets.trades(tickers, function (tradez) {
    tickerCallback(tradez);
  });
};

var stats = exports.stats = function stats(ticker, interval) {
  client().websockets.candlesticks(ticker, interval, function (candlesticks) {
    var eventType = candlesticks.e,
        eventTime = candlesticks.E,
        symbol = candlesticks.s,
        ticks = candlesticks.k;
    var open = ticks.o,
        high = ticks.h,
        low = ticks.l,
        close = ticks.c,
        volume = ticks.v,
        trades = ticks.n,
        interval = ticks.i,
        isFinal = ticks.x,
        quoteVolume = ticks.q,
        buyVolume = ticks.V,
        quoteBuyVolume = ticks.Q;

    console.log(symbol + " " + interval + " candlestick update");
    console.log("open: " + open);
    console.log("high: " + high);
    console.log("low: " + low);
    console.log("close: " + close);
    console.log("volume: " + volume);
    console.log("isFinal: " + isFinal);
  });
};