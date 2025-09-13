import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="text-[rgb(223_229_236)] w-full h-16 border-b border-gray-300 bg-[#0d1216] px-2 sm:px-4 py-2 box-border flex justify-between items-center sticky top-0 z-50">
      {/* Logo Section */}
      <div className="logo flex items-center gap-1 sm:gap-2">
        <img src={Logo} alt="BlockVault" className="h-8 sm:h-10 w-auto" />
        <a href="/" className="font-bold text-sm sm:text-base">
          <span className="">BlockVault</span>

        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-2 lg:gap-4 font-medium items-center">
        {isAuthenticated && (
          <button 
            onClick={() => {
              logout();
            }}
            className="text-xs lg:text-sm px-2 lg:px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition">
            Logout
          </button>
        )}
        {!isAuthenticated && (
          <button 
            onClick={() => navigate('/auth')}
            className="text-xs lg:text-sm px-2 lg:px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition">
            Login
          </button>
        )}
        <a className="text-xs lg:text-sm px-2 lg:px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition" href="/about">
          About
        </a>
        <a className="text-xs lg:text-sm px-2 lg:px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition" href="/contact">
          Contact
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`bg-white block h-0.5 w-6 rounded-sm my-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0d1216] border-b border-gray-300 md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {isAuthenticated && (
              <button 
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition text-left">
                Logout
              </button>
            )}
            {!isAuthenticated && (
              <button 
                onClick={() => {
                  navigate('/auth');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition text-left">
                Login
              </button>
            )}
            <a 
              className="text-sm px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition"
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              className="text-sm px-3 py-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;