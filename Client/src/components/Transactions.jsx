import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const { token } = useAuth();
  const [Assets, setAssets] = useState({});
  const [Loading, setLoading] = useState(true);

  const fetch_assets = async () => {
    setLoading(true);
    try {
      const url = `${apiUrl}/transaction`;
      const res = await fetch(url, {
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
    fetch_assets();
  }, []);

  return (
    <>
      {Loading ? (
        // Skeleton table
        <table className="w-full my-3 text-lg font-extralight text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Amount</th>
              <th>Buy Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx}>
                <td className="py-2">
                  <div className="h-4 w-6 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 w-12 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full my-3 text-lg font-extralight text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Amount</th>
              <th>Buy Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Assets.transactions && Assets.transactions.length > 0 ? (
              Assets.transactions.map((tx, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{tx.cryptoname}</td>
                  <td>{tx.amt}</td>
                  <td>$ {tx.buyprice}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Assets</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Transactions;
