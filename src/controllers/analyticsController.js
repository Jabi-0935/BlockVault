const { fetchPortfolioData } = require("./portfolioController");
const mongoose = require("mongoose");

const getprice = async (ticker) => {
  try {
    let response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`
    );
    let data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
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

module.exports = { getPortfolioMetrics };
