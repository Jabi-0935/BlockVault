import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./Auth/InputField";
import { useAuth } from "../context/AuthContext";
import { useDash } from "../context/DashContext";
const apiUrl = import.meta.env.VITE_API_URL;

const New_Asset = ({
  add = true,
  id = "",
  coin = "",
  price = 1,
  amount = 1,
  onClose,
  onSuccess,
}) => {
  const { cryptos } = useDash();
  const { token } = useAuth();
  const [Message, setMessage] = useState("");
  const [searchterm, setSearchTerm] = useState("");
  const [coinresult, setCoinresult] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let url = `${apiUrl}/portfolio`;
    const params = {
      cryptoname: data.coin.toUpperCase(),
      buyprice: data.buyprice,
      amt: data.amount,
    };
    if (!add) {
      url = `${apiUrl}/portfolio/${id}`;
      params.cryptoname = data.coin.toUpperCase();
    }
    const method = add ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    const result = await res.json();
    setMessage(result.message);

    if (onSuccess) onSuccess();
    else if (onClose) onClose();
  };

  const handleCoinSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setValue("coin", term);

    if (term.length > 0) {
      const results = cryptos.filter((coin) =>
        (coin.name.toLowerCase().startsWith(term.toLowerCase()) || coin.symbol.toLowerCase().startsWith(term.toLowerCase()))
      );
      setCoinresult(results.slice(0, 10));
    } else {
      setCoinresult([]);
    }
  };

  const selectCoin = (ticker) => {
    setValue("coin", ticker);
    setSearchTerm(ticker);
    setCoinresult([]);
  };

  return (
    <>
      <div className="box-border border border-white rounded-2xl p-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">Add Transaction</h3>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <InputField
              type="text"
              placeholder="Coin"
              name="coin"
              value={searchterm}
              register={register}
              errors={errors}
              disabled={!add}
              onChange={handleCoinSearch}
              rules={{
                required: "Coin Required",
                validate: (value) =>
                  cryptos.some(
                    (c) => c.symbol.toLowerCase() === value.toLowerCase()
                  ) || "Select a valid coin from the list",
              }}
            />
            {coinresult.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto z-50 text-sm text-black">
                {coinresult.map((c, idx) => (
                  <li
                    key={idx}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectCoin(c.symbol)}
                  >
                    {c.name} ({c.symbol})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <InputField
            type="number"
            placeholder="BuyPrice"
            name="buyprice"
            value={price}
            register={register}
            errors={errors}
            rules={{
              required: "Buy Price Required",
              valueAsNumber: true,
              validate: (value) => {
                value > 0 || "Price Must be greater than 0";
              },
            }}
          />
          <InputField
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            register={register}
            errors={errors}
            rules={{
              required: "Amount Required",
              valueAsNumber: true,
              validate: (value) => {
                value > 0 || "Amount Must be greater than 0";
              },
            }}
            step="any"
          />
          <button type="submit" className="py-1 px-2">
            Submit
          </button>
        </form>
        <div className="h-4 text-xs mt-1 text-center text-green-400">
          {Message && Message}
        </div>
      </div>
    </>
  );
};

export default New_Asset;
