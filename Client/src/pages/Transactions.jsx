import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ImGift } from "react-icons/im";
import { useParams } from "react-router-dom";
import New_Asset from "../components/New_Asset";
const apiUrl = import.meta.env.VITE_API_URL;
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Transactions = () => {
  const params = useParams();
  const { token } = useAuth();
  const [Assets, setAssets] = useState({});
  const [Loading, setLoading] = useState(true);
  const [isModalOpen, setModal] = useState(false);

  const update = async (id) => {
    const url = `${apiUrl}/transaction/${id}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
  };

  const fetch_assets = async () => {
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
      <div className="flex p-4 items-center">
        <img
          className="w-6 h-6 sm:w-12 sm:h-12 object-contain mr-2"
          src={`https://img.logokit.com/crypto/${params.id}?token=${C_LOGO}`}
          alt={`${params.id} logo`}
        />
        <span className="">{params.id}</span>
      </div>
      <div className="box-border m-4">
        {Loading ? (
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
                <th className="text-end">Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {Assets.transactions && Assets.transactions.length > 0 ? (
                Assets.transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{idx + 1}</td>
                    <td className="text-end">{tx.amt}</td>
                    <td className="text-end">$ {tx.buyprice}</td>
                    <td className="text-end">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="">
                      <button
                        onClick={() => {
                          setModal(true);
                          update(tx.id);
                        }}
                        className="border mx-1 border-white rounded-xl px-2 py-1"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => delete tx.id}
                        className="border border-white rounded-xl px-2 py-1"
                      >
                        Delete
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
              <New_Asset />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
