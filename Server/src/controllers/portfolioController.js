// addCrypto → add a new crypto entry for the user

// updateCrypto → update amount or buy price

// deleteCrypto → remove a crypto entry

// getPortfolio → fetch all holdings for logged-in user

// Optional: analytics → calculate total invested, profit/loss, etc.

const { default: mongoose } = require("mongoose");
const { Asset } = require("../model/Asset");

const addCrypto = async (req, res) => {
  req.body.id = req.user.id;
  let asset_j = req.body;
  let asset = new Asset({
    userid: asset_j.id,
    cryptoname: asset_j.cryptoname,
    buyprice: asset_j.buyprice,
    amt: asset_j.amt,
  });
  await asset.save();
  res.json({ message: "Suucesfully added" });
};


const fetchPortfolioData = async (user_id) => {
  try {
    const com_assets = await Asset.aggregate([
      { $match: { userid: user_id } }, // filter by user
      {
        $group: {
          _id: "$cryptoname",
          totalAmt: { $sum: "$amt" },
          totalCost: { $sum: { $multiply: ["$buyprice", "$amt"] } },
        },
      },
      {
        $project: {
          cryptoName: "$_id",
          _id: 0,
          totalAmt: 1,
          avgBuyPrice: {
            $cond: [
              { $eq: ["$totalAmt", 0] },
              0,
              { $divide: ["$totalCost", "$totalAmt"] },
            ],
          },
        },
      },
    ]);
    return com_assets.map(
      ({ cryptoName, totalAmt, avgBuyPrice }) => ({
        cryptoName,
        totalAmt,
        avgBuyPrice,
      })
    );
  } catch (err) {
    throw err;
  }
};

const getTransacations = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
    const cryptoname = req.params.id;
    const assets = await Asset.find({ userid: user_id,cryptoname:cryptoname });
    res.json({ transactions: assets });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPortfolio = async (req, res) => {
  let user_id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  try {
    const formatted = await fetchPortfolioData(user_id);
    
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateCrypto = async (req, res) => {
  const { id } = req.params;
  const { amt, buyprice } = req.body;
  const user_id = req.user.id;

  try {
    const crypto = await Asset.findById(id);
    if (!crypto) {
      return res.status(404).json({ message: "Crypto Transaction not found" });
    }
    if (crypto.userid.equals(user_id)) {
      crypto.amt = amt;
      crypto.buyprice = buyprice;
      await crypto.save();
      return res.json({ message: "Crypto Transaction Details Updated" });
    } else {
      return res.status(403).json({ message: "Unauthorized Update request" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCrypto = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const crypto = await Asset.findOneAndDelete({ _id: id, userid: user_id });
    if (!crypto) {
      return res.status(404).json({ message: "Crypto Transaction not found" });
    }
    res.json({
      message: "Crypto Transaction Details Deleted",
      transaction: crypto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addCrypto, getPortfolio, deleteCrypto, updateCrypto,fetchPortfolioData, getTransacations};
