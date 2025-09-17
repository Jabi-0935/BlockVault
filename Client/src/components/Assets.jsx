import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDash } from "../context/DashContext";
import { Link, Links, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Assets = () => {
  const navigate = useNavigate();
  const { assets, Loading } = useDash();
  const { token } = useAuth();
  const formatPrice = (price) => {
    let formatted = price < 1 ? price.toFixed(6) : price.toFixed(2);
    return formatted.replace(/\.?0+$/, "");
  };

  const transaction =(cryptoName)=>{
    console.log(cryptoName);
    
    navigate(`/transaction/${cryptoName}`);
  }

  return (
    <>
      <div className="">
        {Loading ? (
          // Skeleton table
          <table className="w-full my-3 text-sm sm:text-lg font-extralight text-center">
            <thead className="text-xs sm:text-sm">
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Avg Price</th>
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
                <th>Price</th>
                <th>Amount</th>
                <th>Avg Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {assets.per_asset && assets.per_asset.length > 0 ? (
                assets.per_asset.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="p-2">{idx + 1}</td>
                    <td>
                      <div className="flex items-center justify-center min-h-[24px] leading-none">
                        <img
                          className="w-3 h-3 sm:w-6 sm:h-6 object-contain mr-2"
                          src={`https://img.logokit.com/crypto/${tx.cryptoName}?token=${C_LOGO}`}
                          alt={`${tx.cryptoName} logo`}
                        />
                        <span className="">{tx.cryptoName}</span>
                      </div>
                    </td>
                    <td className="">{tx.currPrice}</td>
                    <td className="">{tx.totalAmt}</td>
                    <td className="">{formatPrice(tx.avgBuyPrice)}</td>
                    <td>
                      <button onClick={()=>transaction(tx.cryptoName)}>edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-6" colSpan={6}>
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

export default Assets;
