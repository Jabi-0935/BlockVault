import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ImGift } from "react-icons/im";
const apiUrl = import.meta.env.VITE_API_URL;
const C_LOGO = import.meta.env.VITE_C_LOGO;

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
      <div className="">
        {Loading ? (
          // Skeleton table
          <table className="w-full my-3 text-sm sm:text-lg font-extralight text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Amount</th>
                <th>Buy Price</th>
                <th>Date</th>
                <th></th>
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
                  <td>
                    <div className="h-4 w-6 bg-gray-700 rounded animate-pulse mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full my-3 text-sm sm:text-lg font-extralight text-center">
            <thead className="text-xs sm:text-sm">
              <tr>
                <th className="p-1">#</th>
                <th>Coin</th>
                <th>Amount</th>
                <th>Buy Price</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {Assets.transactions && Assets.transactions.length > 0 ? (
                Assets.transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="p-2">{idx + 1}</td>
                    <td>
                      <div className="flex items-center justify-center min-h-[24px] leading-none">
                        <img
                          className="w-3 h-3 sm:w-6 sm:h-6 object-contain mr-2"
                          src={`https://img.logokit.com/crypto/${tx.cryptoname}?token=${C_LOGO}`}
                          alt={`${tx.cryptoname} logo`}
                        />
                        <span className="">
                          {tx.cryptoname}
                        </span>
                      </div>
                    </td>
                    <td className="">{tx.amt}</td>
                    <td className="">$ {tx.buyprice}</td>
                    <td className="">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td><button>edit</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-6" colSpan={5}>
                    No Assets
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Transactions;
