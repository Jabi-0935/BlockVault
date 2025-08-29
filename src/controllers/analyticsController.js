const { fetchPortfolioData } = require("./portfolioController");
const path = require('path')
const mongoose = require("mongoose");
require('dotenv').config({path: path.resolve(__dirname, '../../.env'),quiet:true})
const api  = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
const CMCKEY=process.env.CMC_PRO_API_KEY
console.log(CMCKEY);



const getprice = async (ticker) => {
  const params= {
    symbol:ticker,
    convert:'USD'
  }
  const qstring = new URLSearchParams(params);
  let rawdata = await fetch(`${api}?${qstring}`,{
    headers:{
      'X-CMC_PRO_API_KEY':CMCKEY
    },
  })
  let jdata = await rawdata.json();
  return jdata['data'][`${ticker}`].quote.USD.price;
};

const getPortfolioMetrics = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
    const assets = await fetchPortfolioData(user_id);

    const pricePromises = assets.map(asset => getprice(asset.cryptoName));
    const prices = await Promise.all(pricePromises);

    const updatedAssets = assets.map((asset, index) => {
      const price = prices[index];
      if (price === null) {
        return {
          ...asset,
          currPrice: null,
          returns: 0,
          per_return: 0,
          error: "Could not fetch current price."
        };
      }
      const returns = asset.totalAmt * price - asset.totalAmt * asset.avgBuyPrice;
      const per_return = (100 * returns / (asset.totalAmt * asset.avgBuyPrice)).toFixed(4);

      return {
        ...asset,
        currPrice: price,
        returns: returns,
        per_return: per_return
      };
    });

    res.json(updatedAssets);
  } catch (error) {
    // Catches errors from createFromHexString or fetchPortfolioData
    console.error("Error in getPortfolioMetrics:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};


const main = async ()=>{
  let price = await getprice('BTC');
  console.log(price);
}

main();

module.exports = { getPortfolioMetrics };
