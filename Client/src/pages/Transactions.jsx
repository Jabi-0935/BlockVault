import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ImGift } from "react-icons/im";
import { useParams } from "react-router-dom";
import New_Asset from "../components/New_Asset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../components/Confirm";
import { AssetProvider, useDash } from "../context/DashContext";
import Card from "../components/Card";

const apiUrl = import.meta.env.VITE_API_URL;
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Transactions = () => {
  const params = useParams();
  const { token } = useAuth();
  let { assets, Loading: dashLoading } = useDash();
  assets = assets?.per_asset.find((asset) => asset.cryptoName === params.id);
  const [Transactions, setTransactions] = useState({});
  const [Loading, setLoading] = useState(true);
  const [isModalOpen, setModal] = useState(false);
  const [form, setFrom] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const update = async (id, coin, amount, price) => {
    setFrom(
      <New_Asset
        add={false}
        id={id}
        coin={coin}
        amount={amount}
        price={price}
        onClose={() => setModal(false)}
        onSuccess={() => {
          fetch_transacs();
          setModal(false);
        }}
      />
    );
    setModal(true);
  };

  const remove = async (id) => {
    const url = `${apiUrl}/portfolio/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    fetch_transacs();
  };

  const fetch_transacs = async () => {
    setLoading(true);
    try {
      const url = `${apiUrl}/transaction/${params.id}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setTransactions(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    remove(toDeleteId);
    setConfirmOpen(false);
    setToDeleteId(null);
  };

  const cancelRemove = () => {
    setConfirmOpen(false);
    setToDeleteId(null);
  };
  const formatPrice = (price) => {
    let formatted = price < 1 ? price.toFixed(10) : price.toFixed(2);
    return formatted.replace(/\.?0+$/, "");
  };

  useEffect(() => {
    fetch_transacs();
  }, []);
  console.log(assets);

  return (
    <>
      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this Transaction?"
          onConfirm={confirmRemove}
          onCancel={cancelRemove}
        />
      )}

      {dashLoading ? (
        <div className="flex p-4 items-center">
          <div className="w-3 h-3 sm:w-6 sm:h-6 bg-gray-700 rounded animate-pulse mr-2"></div>
          <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
        </div>
      ) : !assets ? (
        <div className="">
          <div className="flex p-4 items-center">
            <img
              className="w-3 h-3 sm:w-6 sm:h-6 object-contain mr-2"
              src={`https://img.logokit.com/crypto/${params.id}?token=${C_LOGO}`}
              alt={`${params.id} logo`}
            />
            <span className="text-2xl font-bold">{params.id}</span>
          </div>
          <div className="">0</div>
        </div>
      ) : (
        <div className="mx-4 py-4 mb  -2 border-b border-white">
          <div className="flex items-center">
            <img
              className="w-3 h-3 sm:w-6 sm:h-6 object-contain mr-2"
              src={`https://img.logokit.com/crypto/${params.id}?token=${C_LOGO}`}
              alt={`${params.id} logo`}
            />
            <span className="text-xl font-bold">{params.id}</span>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <span className="font-extrabold text-2xl">
              $ {formatPrice(assets.currPrice)}
            </span>
            <span
              className={`font-bold text-xl ${
                assets.per_return.toFixed(2) > 0
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              {assets.per_return.toFixed(2)}%
            </span>
          </div>

          {/* Cards */}
          <div className="cards mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 lg:gap-2">
            <Card
              title="Holding value"
              name=""
              value={assets.holding.toFixed(2)}
            />
            <Card title="Holdings" name="" value={assets.totalAmt} />
            <Card
              title="Total Cost"
              name=""
              value={assets.avgBuyPrice * assets.totalAmt}
            />
            <Card title="Average Net Cost" name="" value={assets.avgBuyPrice} />
            <Card
              title="Total Profit/Loss"
              name=""
              value={assets.returns.toFixed(2)}
              color={true}
            />
          </div>
        </div>
      )}

      <div className="px-4">
        <h1 className="text-base md:text-sm lg:text-xl font-medium py-2">
          Transactions
        </h1>
        {(dashLoading || Loading) ? (
          // Skeleton table
          <table className="w-full text-sm sm:text-lg font-extralight text-center">
            <thead className="text-xs sm:text-sm">
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Buy Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td className="py-2">
                    <div className="h-4 w-6 bg-gray-700 rounded animate-pulse mx-auto"></div>
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
          <table className="w-full text-sm sm:text-lg font-extralight text-center">
            <thead className="text-xs sm:text-sm">
              <tr>
                <th className="py-1">#</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Buy Price</th>
                <th className="text-end">Cost</th>
                <th className="text-end">PNL</th>
                <th className="text-end">Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {Transactions.transactions &&
              Transactions.transactions.length > 0 ? (
                Transactions.transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{idx + 1}</td>
                    <td className="text-end">{tx.amt}</td>
                    <td className="text-end">$ {tx.buyprice}</td>
                    <td className="text-end">{tx.amt * tx.buyprice}</td>
                    <td
                      className={`text-end ${
                        assets.currPrice * tx.amt - tx.amt * tx.buyprice > 0
                          ? "text-green-400"
                          : "text-red-600"
                      }`}
                    >
                      {assets.currPrice * tx.amt - tx.amt * tx.buyprice > 0
                        ? `+$${(
                            assets.currPrice * tx.amt -
                            tx.amt * tx.buyprice
                          ).toFixed(2)}`
                        : `-$${(
                            (assets.currPrice * tx.amt - tx.amt * tx.buyprice) *
                            -1
                          ).toFixed(2)}`}
                    </td>
                    <td className="text-end">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="">
                      <button
                        onClick={() => {
                          update(tx._id, tx.cryptoname, tx.amt, tx.buyprice);
                        }}
                        className="border mx-1 border-white rounded-xl px-2 py-1"
                      >
                        <FontAwesomeIcon icon="fa-solid fa-pen" widthAuto />
                      </button>
                      <button
                        onClick={() => handleRemoveClick(tx._id)}
                        className="border border-white rounded-xl px-2 py-1"
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" widthAuto />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-6" colSpan={5}>
                    No Transactions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
    </>
  );
};

export default Transactions;
