const { fetchPortfolioData } = require("./portfolioController");
const mongoose = require("mongoose");

const getprice = async (ticker) => {
  try {
    let response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`
    );
    let data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
};

const getPortfolioMetrics = async (req, res) => {
  let user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  let assets = await fetchPortfolioData(user_id);
  const updatedAssets = [];
  for (const asset of assets) {
    let price = await getprice(asset.cryptoName);
    let returns = asset.totalAmt * price - asset.totalAmt * asset.avgBuyPrice;
    let per_return = (100*returns / (asset.totalAmt * asset.avgBuyPrice)).toFixed(4);

    console.log(returns, per_return);
    updatedAssets.push({
      ...asset,
      currPrice: price,
      returns: returns,per_return:per_return
    });
  }
  res.json(updatedAssets);
};

module.exports = { getPortfolioMetrics };
