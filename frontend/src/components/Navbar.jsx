import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logoGym.png";

const Navbar = ({ user }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Learn Star
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
