const { fetchPortfolioData } = require("./portfolioController");
const { getPrice } = require("../services/priceService");
const mongoose = require("mongoose");

const getPortfolioMetrics = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
    const assets = await fetchPortfolioData(user_id);

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
      ).toFixed(4);

      return {
        ...asset,
        currPrice: price,
        returns: returns,
        per_return: per_return,
      };
    });

    res.json(updatedAssets);
  } catch (error) {
    console.error("Error in getPortfolioMetrics:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

const overview =async (req,res)=>{
  const updatedAssets = getPortfolioMetrics(req,res);
}

module.exports = { getPortfolioMetrics };
