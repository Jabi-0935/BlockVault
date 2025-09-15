import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const { token } = useAuth();
  const [Assets, setAssets] = useState({});
  const fetch_assets = async () => {
    const url = `${apiUrl}/transaction`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    setAssets(result);
    console.log(result)
  };
  useEffect(() => {
    fetch_assets()
  }, []);

  return (
  <>
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
        {Assets.transactions && Assets.transactions.length>0?(
            Assets.transactions.map((tx,idx)=>(
                <tr key={idx}>
                    <td className="">{idx+1}</td>
                    <td className="">{tx.cryptoname}</td>
                    <td className="">{tx.amt}</td>
                    <td className="">$ {tx.buyprice}</td>
                    <td className="">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
            ))
        ):(
            <tr>
                <td colSpan={4}>No Assets</td>
            </tr>
        )}
    </tbody>
  </table>
  </>
  )
};

export default Transactions;
