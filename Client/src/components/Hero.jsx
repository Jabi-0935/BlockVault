import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Hero = () => {
  const navigate = useNavigate();
  const {user,isAuthenticated} = useAuth();

  return (
    <>
      <div className=" p-5 w-full min-h-[80vh] flex flex-col flex-grow items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          {isAuthenticated?`Welcome Back, ${user.name.toUpperCase()}!`:`Track Your Crypto Portfolio with Ease`}
        </h1>
        <p className="text-1.5xs md:text-lg text-gray-400 mt-4 mb-4">
          {isAuthenticated?`Hoping You are having Great Potential PROFITS Ahead`:`Get live prices, track your investments, and view analytics in one place`}
        </p>
        <button
          type="button"
          className=" inline-flex items-center justify-center whitespace-nowrap font-semibold text-sm leading-5 rounded-lg select-none px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-moon-700 dark:hover:bg-moon-600 text-gray-900 hover:text-gray-900 focus:text-gray-900 dark:text-moon-50 dark:hover:text-moon-50 dark:focus:text-moon-50 focus:outline-none"
          onClick={()=>{
            isAuthenticated?navigate('/dashboard'):navigate('/auth');
          }}
        >
          {isAuthenticated?`Dashboard`:`Get Started`}
        </button>
      </div>
    </>
  );
};

export default Hero;
