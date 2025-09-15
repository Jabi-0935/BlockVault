import React, { useEffect, useState } from "react";
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Card = (props) => {
  const [analytics, setAnalytics] = useState({});
  return (
    <div className="border border-white rounded-xl py-2 px-4">
      <div className={`text-sm sm:text-sm lg:text-lg font-bold flex items-center`}>
        {props.name.length>0 && <span className="flex items-center">
          <img
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 object-contain mr-1"
            src={`https://img.logokit.com/crypto/${props.name}?token=${C_LOGO}`}
            alt={`${props.name} logo`}
          />
          {`${props.name}:`}&nbsp;&nbsp;
        </span>}
        <span
          className={`${
            props.color
              ? props.value > 0
                ? "text-green-300"
                : "text-red-300"
              : ""
          }`}
        >
          {props.value < 0 ? `-$${props.value * -1}` : `$${props.value}`}
        </span>
      </div>
      <div className="info text-xs sm:text-xs lg:text-sm">
        {props.title}
        <span>{props.pnl}</span>
      </div>
    </div>
  );
};

export default Card;
