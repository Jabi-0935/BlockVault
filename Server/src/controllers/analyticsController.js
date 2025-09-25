const { fetchPortfolioData } = require("./portfolioController");
const { getPrice } = require("../services/priceService");
const mongoose = require("mongoose");

const getPortfolioMetrics = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
    const assets = await fetchPortfolioData(user_id);
    let total_balance = 0;
    let total_buy_price= 0;
    let top = { name: null, pnl: -Infinity };
    let loss = { name: null, pnl: Infinity };

    
    const pricePromises = assets.map((asset) => {
      return getPrice(asset.cryptoName);
    });
    const prices = await Promise.all(pricePromises);
    
    const updatedAssets = assets.map((asset, index) => {
      const price = parseFloat(prices[index]);
      
      if (price === null) {
        return {
          ...asset,
          currPrice: null,
          returns: 0,
          per_return: 0,
          error: "Could not fetch current price.",
        };
      }
      const returns =
        asset.totalAmt * price - asset.totalAmt * asset.avgBuyPrice;
      const per_return = (
        (100 * returns) /
        (asset.totalAmt * asset.avgBuyPrice)
      );
      total_balance+=price*asset.totalAmt;
      total_buy_price+=asset.totalAmt*asset.avgBuyPrice;
      
      if (returns > top.pnl) {
        top = { name: asset.cryptoName, pnl: returns };
      }

      if (returns < loss.pnl) {
        loss = { name: asset.cryptoName, pnl: returns };
      }

      return {
        ...asset,
        currPrice: price,
        returns: returns,
        per_return: per_return,
        holding:price*asset.totalAmt,
      };
    });
    const sortedAssets = updatedAssets.sort((a,b)=>b.holding - a.holding);
    

    res.json({
      gainer:top,
      loser:loss,
      balance:total_balance,
      pnl:total_balance-total_buy_price,
      per_asset:sortedAssets,
    });
  } catch (error) {
    console.error("Error in getPortfolioMetrics:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

const overview =async (req,res)=>{
  const updatedAssets = getPortfolioMetrics(req,res);
}

module.exports = { getPortfolioMetrics };
