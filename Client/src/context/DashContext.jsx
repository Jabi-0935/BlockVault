import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashContext = createContext();

export const useDash = () => useContext(DashContext);
export const AssetProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {token} = useAuth();
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

  const analytics = async () => {
    setLoading(true);
    try {
      const url = `${apiUrl}/analytics`;
      // console.log(url)
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setAssets(result);
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
  };

  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
};
