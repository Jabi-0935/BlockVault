import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./Auth/InputField";
import { useAuth } from "../context/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

const New_Asset = () => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const params = {
      cryptoname: data.coin.toUpperCase(),
      buyprice: data.buyprice,
      amt: data.amount,
    };
    const url = `${apiUrl}/portfolio`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="box-border border border-white rounded-2xl p-4">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Coin"
          name="coin"
          register={register}
          errors={errors}
          rules={{
            required: "Coin Required",
          }}
        />
        <InputField
          type="number"
          placeholder="Amount"
          name="amount"
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
    </div>
  );
};

export default New_Asset;
