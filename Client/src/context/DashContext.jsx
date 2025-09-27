import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashContext = createContext();

export const useDash = () => useContext(DashContext);
export const AssetProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  const [Loading, setLoading] = useState(true);

  const [assets, setAssets] = useState({
    gainer: {
      name: "",
      price: 0,
    },
    loser: {
      name: "",
      price: 0,
    },
    balance: 0,
    pnl: 0,
    per_asset: [],
  });
  const [cryptos, setCryptos] = useState([
    {
      name: "",
      symbol: "",
    },
  ]);

  const analytics = async () => {
    setLoading(true);
    try {
      const assetsurl = `${apiUrl}/analytics`;
      const cryptosurl = `${apiUrl}/cryptos`;
      const assets_res = await fetch(assetsurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const cryptos_res = await fetch(cryptosurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const assets_result = await assets_res.json();
      const cryptos_result = await cryptos_res.json();

      setAssets(assets_result);
      setCryptos(cryptos_result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analytics();
  }, []);

  const value = {
    assets,
    Loading,
    cryptos,
  };

  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
};
