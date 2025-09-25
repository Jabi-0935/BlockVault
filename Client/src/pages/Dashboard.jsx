import React, { use, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card.jsx";
import { useDash } from "../context/DashContext.jsx";
import Assets from "../components/Assets.jsx";
import New_Asset from "../components/New_Asset.jsx";
import PieChart from "../components/PieChart.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiUrl = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const { assets, Loading } = useDash();
  console.log(assets)
  const { user, token } = useAuth();
  const [isModalOpen, setModal] = useState(false);
  const [form, setFrom] = useState();
  const add = async () => {
    setFrom(
      <New_Asset
        onClose={() => setModal(false)}
        onSuccess={() => {
          setModal(false);
        }}
      />
    );
    setModal(true);
  };

  return (
    <>
      <div className="mx-4 my-2 ">
        <div className="">
          <h1 className="text-2xl font-bold mb-2">Your Dashboard</h1>
          
        </div>
        <div className="card grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2">
          <Card
            title="Current Balance"
            name=""
            value={assets.balance.toFixed(2)}
          />
          <Card
            title="Total Profit/Loss"
            name=""
            value={assets.pnl.toFixed(2)}
            color={true}
          />
          <Card
            title={`Top Gainer`}
            name={`${assets.gainer.name}`}
            value={`${
              assets.gainer.pnl ? parseFloat(assets.gainer.pnl).toFixed(2) : 0.0
            }`}
            color={true}
          />
          <Card
            title="Top Loser"
            name={`${assets.loser.name}`}
            value={`${
              assets.loser.pnl ? parseFloat(assets.loser.pnl).toFixed(2) : 0.0
            }`}
            color={true}
          />
        </div>

        {/* Visual Representations */}
        <div className="graphs flex gap-2">
          <PieChart type="pie" />
          <PieChart />
        </div>

        {/* List of assets */}
        <div className="assets mt-4 border-t p-2 border-white">
          <div className="flex justify-between m-4">
            <h1 className="text-xl font-bold">Assets</h1>
            <button
              className="text-xs lg:text-sm px-2 lg:px-2 py-1 border border-gray-600 rounded-xl hover:bg-gray-700 transition"
              onClick={() => add()}
            >
              Add
            </button>
          </div>
          <Assets />
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                onClick={() => setModal(false)}
              />
              <div className="relative bg-gray-800 rounded-xl p-4 w-[90%] sm:w-[350px]">
                {form}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
