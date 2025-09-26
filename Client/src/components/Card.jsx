import React, { useEffect, useState } from "react";
const C_LOGO = import.meta.env.VITE_C_LOGO;

const Card = ({ name, color, value, title, pnl }) => {
  const [analytics, setAnalytics] = useState({});
  return (
    <div className="border border-white rounded-lg py-3 px-4">
      <div className={`text-sm sm:text-sm lg:text-lg font-bold flex items-center`}>
        {(name || name.length > 0) && (
          <span className="flex items-center">
            <img
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 object-contain mr-1"
              src={`https://img.logokit.com/crypto/${name}?token=${C_LOGO}`}
              alt={`${name} logo`}
            />
            {`${name}:`}&nbsp;&nbsp;
          </span>
        )}
        <span
          className={`${
            color ? (value > 0 ? "text-green-300" : "text-red-300") : ""
          }`}
        >
          {value < 0 ? `-$${value * -1}` : `$${value}`}
        </span>
      </div>
      <div className="info text-xs sm:text-xs lg:text-sm">
        {title}
        <span>{pnl}</span>
      </div>
    </div>
  );
};

export default Card;
