import React from "react";

const Toogle = (props) => {
  return (
    <div className="options w-full px-4 flex justify-around m-2">
      <button
        onClick={() => props.setLogin(true)}
        className={`rounded-sm py-2 px-3 box-border text-sm
                ${
                  !props.isLogin
                    ? "border border-white text-white hover:bg-gray-700"
                    : "bg-white text-black font-bold"
                }`}
      >
        Login
      </button>
      <button
        onClick={() => props.setLogin(false)}
        className={`rounded-sm py-2 px-3 box-border text-sm
                ${
                  props.isLogin
                    ? "border border-white text-white hover:bg-gray-700"
                    : "bg-white text-black font-bold"
                }`}
      >
        Signup
      </button>
    </div>
  );
};

export default Toogle;
