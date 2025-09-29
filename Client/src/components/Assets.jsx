import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDash } from "../context/DashContext";
import { Link, Links, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const apiUrl = import.meta.env.VITE_API_URL;
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Assets = ({ add }) => {
  const navigate = useNavigate();
  const { assets, Loading } = useDash();
  const [per_asset, setPerassets] = useState([]);
  const { token } = useAuth();
  const [isModalOpen, setModal] = useState(false);
  const [coinSort, setCoinSort] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [amountSort, setAmountSort] = useState(null);
  const [pnlSort, setPnlSort] = useState(null);

  const formatPrice = (price) => {
    let formatted =
      price < 1 && price > 0 ? price.toFixed(10) : price.toFixed(2);
    return formatted.replace(/\.?0+$/, "");
  };

  const transaction = (cryptoName) => {
    navigate(`/transaction/${cryptoName}`);
  };
  useEffect(() => {
    setPerassets(assets?.per_asset ?? []);
  }, [assets]);

  return (
    <>
      <div className="">
        {Loading ? (
          // Skeleton table
          <table className="w-full my-3 text-sm sm:text-lg font-extralight text-center">
            <thead className="text-xs sm:text-sm">
              <tr>
                <th className="p-1">#</th>
                <th className="text-end pr-2">Coin</th>
                <th className="hidden sm:table-cell text-end">Price</th>
                <th className="text-end">Amount</th>
                <th className="hidden sm:table-cell text-end">Avg Price</th>
                <th className="text-end">PNL</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold sm:text-base">
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td className="p-2">
                    <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center justify-end">
                      <div className="w-3 h-3 sm:w-6 sm:h-6 bg-gray-700 rounded-full animate-pulse mr-2"></div>
                      <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell text-end">
                    <div className="h-4 w-16 bg-gray-700 rounded animate-pulse ml-auto"></div>
                  </td>
                  <td className="text-end">
                    <div className="h-4 w-12 bg-gray-700 rounded animate-pulse ml-auto"></div>
                  </td>
                  <td className="hidden sm:table-cell text-end">
                    <div className="h-4 w-16 bg-gray-700 rounded animate-pulse ml-auto"></div>
                  </td>
                  <td className="text-end">
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse ml-auto"></div>
                  </td>
                  <td className="text-end">
                    <div className="flex justify-end gap-2">
                      <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
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
                <th
                  className="text-end pr-4 cursor-pointer "
                  onClick={() => {
                    const newSort = coinSort === "asc" ? "desc" : "asc";
                    const sorted = [...per_asset].sort((a, b) => {
                      return newSort === "asc"
                        ? a.cryptoName.localeCompare(b.cryptoName)
                        : b.cryptoName.localeCompare(a.cryptoName);
                    });
                    setPerassets(sorted);
                    setCoinSort(newSort);
                    setPriceSort(null);
                    setAmountSort(null);
                    setPnlSort(null);
                  }}
                >
                  Coin{" "}
                  {coinSort === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                  ) : coinSort === "desc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-sort" />
                  )}
                </th>
                <th
                  className="hidden sm:table-cell text-end cursor-pointer"
                  onClick={() => {
                    const newSort = priceSort === "asc" ? "desc" : "asc";
                    const sorted = [...per_asset].sort((a, b) => {
                      return newSort === "asc"
                        ? a.currPrice - b.currPrice
                        : b.currPrice - a.currPrice;
                    });
                    setPerassets(sorted);
                    setCoinSort(null);
                    setPriceSort(newSort);
                    setAmountSort(null);
                    setPnlSort(null);
                  }}
                >
                  Price{" "}
                  {priceSort === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                  ) : priceSort === "desc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-sort" />
                  )}
                </th>
                <th
                  className="text-end cursor-pointer"
                  onClick={() => {
                    const newSort = amountSort === "asc" ? "desc" : "asc";
                    const sorted = [...per_asset].sort((a, b) => {
                      return newSort === "asc"
                        ? a.totalAmt - b.totalAmt
                        : b.totalAmt - a.totalAmt;
                    });
                    setPerassets(sorted);
                    setCoinSort(null);
                    setPriceSort(null);
                    setAmountSort(newSort);
                    setPnlSort(null);
                  }}
                >
                  Amount{" "}
                  {amountSort === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                  ) : amountSort === "desc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-sort" />
                  )}
                </th>
                <th className="hidden sm:table-cell text-end">Avg Price</th>
                <th
                  className="text-end cursor-pointer"
                  onClick={() => {
                    const newSort = pnlSort === "asc" ? "desc" : "asc";
                    const sorted = [...per_asset].sort((a, b) => {
                      return newSort === "asc"
                        ? a.returns - b.returns
                        : b.returns - a.returns;
                    });
                    setPerassets(sorted);
                    setCoinSort(null);
                    setPriceSort(null);
                    setAmountSort(null);
                    setPnlSort(newSort);
                  }}
                >
                  PNL{" "}
                  {pnlSort === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                  ) : pnlSort === "desc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-sort" />
                  )}
                </th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base font-semibold sm:text-base">
              {per_asset && per_asset.length > 0 ? (
                per_asset.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-4 flex items-center justify-end">
                      <div className="flex items-center justify-center min-h-[24px] leading-none">
                        <img
                          className="w-4 h-4 sm:w-6 sm:h-6 object-contain mr-2"
                          src={`${apiUrl}${tx.logo}`}
                          alt={`${tx.cryptoName} logo`}
                        />
                        <span className="">{tx.cryptoName}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell text-end">
                      {formatPrice(tx.currPrice)}
                    </td>
                    <td className=" text-sm text-end">{tx.totalAmt}</td>
                    <td className="hidden sm:table-cell text-end">
                      {formatPrice(tx.avgBuyPrice)}
                    </td>
                    <td
                      className={`text-end font-bold text-xs ${
                        tx.returns > 0 ? "text-green-400" : "text-red-600"
                      }`}
                    >
                      {tx.returns > 0
                        ? `+$${tx.returns.toFixed(2)}`
                        : `-$${(tx.returns * -1).toFixed(2)}`}
                    </td>
                    <td className="text-end">
                      <button onClick={() => add(tx.cryptoName)}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" />
                      </button>
                      <button onClick={() => transaction(tx.cryptoName)}>
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-6" colSpan={7}>
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
