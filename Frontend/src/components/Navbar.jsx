import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("homzyToken");

  const handleLogout = () => {
    localStorage.removeItem("homzyToken");
    localStorage.removeItem("homzyUser");
    navigate("/login");
  };

  return (
    <div className="w-auto flex justify-between p-5 items-center bg-black text-white mt-4 h-15 m-5 rounded-4xl py-3.5 relative">
      {/* Logo */}
      <div className="navbar-logo">
        <img className="w-40" src={logo} alt="Logo" />
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden text-white focus:outline-none"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        )}
      </button>

      {/* Desktop Menu */}
      <ul className="list-none hidden md:flex gap-16.5 font-light">
        <li className="relative text-l font-thin text-white hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="relative text-l font-thin text-white hover:underline">
          <Link to="/listing">Browse Listing</Link>
        </li>
        <li className="relative text-l font-thin text-white hover:underline">
          <Link to="/favroites">Favrioutes</Link>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-3">
        {!token ? (
          <>
            <Link to="/login" className="bg-white text-black w-20 rounded h-8 flex justify-center items-center hover:bg-gray-700 hover:text-white">Login</Link>
            <Link to="/signup" className="bg-white text-black w-20 rounded h-8 flex justify-center items-center hover:bg-gray-700 hover:text-white">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-600 text-white w-24 rounded h-8 hover:bg-red-800">Logout</button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full list-none bg-black flex flex-col p-5 rounded-xl py-4 gap-4 md:hidden">
          <Link to="/">Home</Link>
          <Link to="/listing">Browse Listing</Link>
          <Link to="/favroites">Favrioutes</Link>
          {!token ? (
            <>
              <Link to="/login" className="bg-white text-black w-20 rounded h-8 flex justify-center items-center hover:bg-gray-700 hover:text-white">Login</Link>
              <Link to="/signup" className="bg-white text-black w-20 rounded h-8 flex justify-center items-center hover:bg-gray-700 hover:text-white">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-600 text-white w-24 rounded h-8 hover:bg-red-800">Logout</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
