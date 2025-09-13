import React from "react";
import Logo from "../assets/Logo.png";

const NavBar = () => {
  return (
    <nav className="text-[rgb(223_229_236)] w-full h-16 border-b border-gray-300 bg-[#0d1216] px-4 py-2 box-border flex justify-between items-center sticky top-0">
      <div className="logo flex items-center gap-2">
        <img src={Logo} alt="BlockVault" className="h-10 w-auto" />
        <a href="/" className="font-bold">BlockVault</a>
      </div>
      <div className="auths flex gap-4 font-medium">
        <a className=" text-xs px-3 py-1 border border-gray-600 rounded-xl hover:bg-gray-700 transition" href="/about">About</a>
        <a className=" text-xs px-3 py-1 border border-gray-600 rounded-xl hover:bg-gray-700 transition" href="/contact">Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;