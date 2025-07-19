import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';




export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://buy-buddy-backend-ege6.onrender.com/api/auth/login", user);
      if (res.status === 200 && res.data.token) {
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true); // update nav
      toast.success("Login successful!", {
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      navigate("/");
        } else {
        toast.error("Unexpected response from server.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
        }
    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Invalid credentials!",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={user.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700  text-white font-semibold py-2 rounded"
          >
            Login
          </button>
          <p className="text-sm text-center mt-2 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
