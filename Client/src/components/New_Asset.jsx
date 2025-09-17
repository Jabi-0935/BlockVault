import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./Auth/InputField";
import { useAuth } from "../context/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

const New_Asset = ({
  add = true,
  id = "",
  coin = "",
  price = 1,
  amount = 1,
  onClose,
  onSuccess
}) => {
  const { token } = useAuth();
  const [Message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
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

  return (
    <div className="box-border border border-white rounded-2xl p-4">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Coin"
          name="coin"
          value={coin}
          register={register}
          errors={errors}
          disabled={!add}
          rules={{
            required: "Coin Required",
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
        <button type="submit" className="py-1 px-2">
          Submit
        </button>
      </form>
      <div className="h-4 text-xs mt-1 text-center text-green-400">
        {Message && Message}
      </div>
    </div>
  );
};

export default New_Asset;
