const binance = require('node-binance-api');
import _ from 'lodash';
require('dotenv').config();

export const client = () => {
  binance.options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.API_SECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: true // If you want to use sandbox mode where orders are simulated
  });
  return binance;
}

export const getPrice = (coin) => {
  let id = _.upperCase(coin)+'USDT';
  return new Promise(function(resolve, reject) {
    client().prices(id, (error, ticker) => {
      if (error) {
        reject(error);
      } else {
        resolve(ticker);
      }
    });
  });
}
