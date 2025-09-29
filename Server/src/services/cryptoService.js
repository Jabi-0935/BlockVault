const path = require("path");
const fs = require("fs-extra");
const LOGO_CACHE_DIR = path.join(__dirname, "../assets/logos");
fs.ensureDirSync(LOGO_CACHE_DIR);

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});
const api = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const C_LOGO = process.env.C_LOGO;
const CMCKEY = process.env.CMC_PRO_API_KEY;
const cache = { crytpo_list: [] };
const TTL = 10 * 1000;

const getPrice = async (ticker) => {
  if (cache[ticker] && Date.now() - cache[ticker].timestamp < TTL) {
    return cache[ticker].price;
  }
  const params = {
    symbol: ticker,
    convert: "USD",
  };
  const qstring = new URLSearchParams(params);
  let rawdata = await fetch(`${api}?${qstring}`, {
    headers: {
      "X-CMC_PRO_API_KEY": CMCKEY,
    },
  });
  let jdata = await rawdata.json();
  let currPrice = {
    price: parseFloat(jdata["data"][`${ticker}`].quote.USD.price),
    timestamp: Date.now(),
  };
  cache[ticker] = currPrice;
  return cache[ticker].price;
};

const fetchAllCryptos = async () => {
  if (
    cache["crypto_list"] &&
    Date.now() - cache["crypto_list"].timestamp < 86400 * 1000
  ) {
    return cache["crypto_list"].data;
  }
  const BASE_URL =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  let allCryptos = [];
  let start = 1;
  const limit = 5000;
  const url = `${BASE_URL}?start=${start}&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": CMCKEY,
    },
  });
  const result = await res.json();
  const simplifiedData = result.data.map((crypto) => ({
    name: crypto.name,
    symbol: crypto.symbol,
  }));
  cache["crypto_list"] = { data: simplifiedData, timestamp: Date.now() };
  return simplifiedData;
};

const getLogo = async (cryptoName = "") => {
  if (!cryptoName) return null;


  const filePath = path.join(LOGO_CACHE_DIR, `${cryptoName}.png`);
  if (fs.existsSync(filePath)) {
    return `/logos/${cryptoName}.png`;
  }

  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${cryptoName}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": CMCKEY,
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch logo for ${cryptoName}: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const result = await res.json();
    const cryptoDataArray = result.data[cryptoName];
    if (!cryptoDataArray || cryptoDataArray.length === 0) {
      console.error(`No data found for symbol: ${cryptoName}`);
      return null;
    }

    const cryptoData = cryptoDataArray[0];
    const logo = cryptoData.logo;
    const logoRes = await fetch(logo);

    if (!logoRes.ok) {
      console.error(
        `Failed to download logo for ${cryptoName}: ${logoRes.status}`
      );
      return null;
    }

    const arrayBuffer = await logoRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    return `/logos/${cryptoName}.png`;
  } catch (error) {
    console.error(`Error fetching logo for ${cryptoName}:`, error.message);
    return null;
  }
};

module.exports = { getPrice, fetchAllCryptos, getLogo };
