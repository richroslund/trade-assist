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

const balance = () => new Promise((res, rej)=> {
  client().balance((err, balances) => {
    if(err)
      return rej(err);
    else
      return res(balances);
  });
});

export const getPrice = (coin) => {
  let id = _.upperCase(coin);
  return new Promise(function(resolve, reject) {
    client().prices((error, ticker) => {
      if (error) {
        reject(error);
      } else {
        let tickerPrices = _.reduce(ticker, (res, val, key) => {
          if(_.startsWith(key, id))
            res[key]=val;
          return res;
        },{});
        resolve(tickerPrices);
      }
    });
  });
}

export const getBalance = (coin) => balance().then((balances) =>{
  if(_.isArray(coin))
    return _(coin).map((c) => _.find(balances, (v,k) => k===c));
  if(_.isString(coin))
    return _.find(balances, (v,k) => k===coin);
  return _.reduce(balances, (res, val, key) => {
    if((parseInt(val.available)+parseInt(val.onOrder))>0)
      res[key] = val;
    return res;
  }, {});
});