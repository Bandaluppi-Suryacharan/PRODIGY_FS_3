import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Buy from "./pages/Buy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { FaOpencart ,FaShoppingCart,FaHome, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check token when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!", {
      style: {
        background: "#0f172a", // dark navy
        color: "#fff",          // text color
      },
    });
  };

  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-white text-xl hover:opacity-90 transition">
                <FaOpencart className="text-white text-2xl" />
                Buy Buddy
          </Link>

          <div className="flex gap-10">
           <Link to="/" className="flex items-center gap-1 hover:font-semibold transition">
                <FaHome className="text-white" />
                Home
          </Link>
            <Link to="/cart" className="flex items-center gap-1 hover:font-semibold transition">
                  <FaShoppingCart className="text-white" />
                  Cart
            </Link>

            {/* 👇 Conditional Login/Logout */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center gap-1 hover:font-semibold transition">
                    <FaSignOutAlt className="text-white" />
                      Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-1 hover:font-semibold transition">
                    <FaSignInAlt className="text-white" />
                      Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/signup" element={<Signup />} />
        {/* 👉 Pass setIsLoggedIn to Login */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}
