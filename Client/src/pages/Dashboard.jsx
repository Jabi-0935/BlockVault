import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card.jsx";
import Transactions from "../components/Transactions";

const apiUrl = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const { user, token } = useAuth();
  const [Loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
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
    try{const url = `${apiUrl}/analytics`;
    // console.log(url)
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    setDetails(result);}
    catch(err){
      console.error(err);      
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    analytics();
  }, []);

  return (
    <>
      <div className="mx-4 my-2 ">
        <h1 className="text-center text-2xl font-bold mb-2">Your Dashboard</h1>
        <div className="card grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Current Balance"
            name=""
            value={details.balance.toFixed(2)}
          />
          <Card
            title="Total Profit/Loss"
            name=""
            value={details.pnl.toFixed(2)}
            color={true}
          />
          <Card
            title={`Top Gainer`}
            name={`${details.gainer.name}`}
            value={`${
              details.gainer.pnl
                ? parseFloat(details.gainer.pnl).toFixed(2)
                : 0.0
            }`}
            color={true}
          />
          <Card
            title="Top Loser"
            name={`${details.loser.name}`}
            value={`${
              details.loser.pnl ? parseFloat(details.loser.pnl).toFixed(2) : 0.0
            }`}
            color={true}
          />
        </div>
        <div className="graphs"></div>
        <div className="transac mt-4 border-t p-2 border-white">
          <div className="flex justify-between m-4">
          <h1 className="text-xl font-bold">Transactions</h1>
          <button className="text-xs lg:text-sm px-2 lg:px-2 py-1 border border-gray-600 rounded-xl hover:bg-gray-700 transition">
            Add</button>
          </div>
          <Transactions />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
