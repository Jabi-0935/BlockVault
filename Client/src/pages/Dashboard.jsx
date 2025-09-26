import React, { use, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card.jsx";
import { useDash } from "../context/DashContext.jsx";
import Assets from "../components/Assets.jsx";
import New_Asset from "../components/New_Asset.jsx";
import PieChart from "../components/PieChart.jsx";
import BarChart from "../components/BarChart.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const apiUrl = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const { assets, Loading } = useDash();
  const { user, token } = useAuth();
  const [isModalOpen, setModal] = useState(false);
  const [graphs, setgraphs] = useState(() => {
    return window.innerWidth >= 1280;
  });
  const [form, setFrom] = useState();
  const add = async (coin = "") => {
    setFrom(
      <New_Asset
        coin={coin}
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
        <div className="px-2 flex items-center mb-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-2xl font-bold">Portfolio</h1>
            <span className="text-lg sm:text-2xl text-yellow-300">
              <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
            </span>
          </div>
          <button
            className={`text-xs lg:text-sm px-2 lg:px-2 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition
              ${graphs ? "bg-gray-600 text-white" : ""}`}
            onClick={() => {
              setgraphs(!graphs);
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-chart-pie" />
          </button>
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
        {graphs && (
          <>
            {/* Desktop view - side by side */}
            <div className="graphs hidden xl:flex xl:gap-2">
              <PieChart />
              <BarChart />
            </div>

            {/* Mobile/Tablet view - fullscreen overlay */}
            <div className="xl:hidden fixed inset-0 z-50 bg-gray-900 overflow-y-auto">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Analytics</h2>
                <button
                  onClick={() => setgraphs(false)}
                  className="text-white hover:bg-gray-700 p-2 rounded-full transition"
                >
                  <FontAwesomeIcon icon="fa-solid fa-times" />
                </button>
              </div>

              {/* Charts in fullscreen */}
              <div className="p-4 space-y-4">
                <div className="w-full">
                  <PieChart />
                </div>
                <div className="w-full">
                  <BarChart />
                </div>
              </div>
            </div>
          </>
        )}

        {/* List of assets */}
        <div className="assets mt-4 border-t p-2 border-white">
          <div className="flex justify-between ml-4">
            <h1 className="text-xl font-bold">Assets</h1>
            <button
              className="text-xs lg:text-sm px-2 lg:px-2 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
              onClick={() => add()}
            >
              <FontAwesomeIcon icon="fa-solid fa-plus" /> Coin
            </button>
          </div>

          {/* Assets */}
          <Assets add={add} />

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
