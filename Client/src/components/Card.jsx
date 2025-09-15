import React, { useEffect, useState } from "react";
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Card = (props) => {
  const [analytics, setAnalytics] = useState({});
  console.log("from cards",props)
  return (
    <div className="border border-white rounded-xl py-2 px-4">
      <div className={`text-sm sm:text-sm lg:text-lg font-bold flex `}>
        {props.name.length>0 && <span className="flex">
          <img
            className="w-3 h-3 sm:w-6 sm:h-6 object-contain mr-1"
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
