const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env'),quiet:true});
const api  = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const CMCKEY=process.env.CMC_PRO_API_KEY;
const cache ={};
const TTL =10*1000;

const getPrice = async (ticker) => {
  if(cache[ticker] && Date.now()-cache[ticker].timestamp <TTL){
    return cache[ticker].price;
  }
  const params= {
    symbol:ticker,
    convert:'USD'
  }
  const qstring = new URLSearchParams(params);
  let rawdata = await fetch(`${api}?${qstring}`,{
    headers:{
      'X-CMC_PRO_API_KEY':CMCKEY
    },
  },)
  let jdata = await rawdata.json();
  let currPrice = {price:parseFloat(jdata['data'][`${ticker}`].quote.USD.price),timestamp:Date.now()};
  cache[ticker] = currPrice;
  return cache[ticker].price
};

module.exports = {getPrice}