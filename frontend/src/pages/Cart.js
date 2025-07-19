import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import toast from 'react-hot-toast';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Get token and user ID
  const token = localStorage.getItem("token");
  let userId = null;
  let cartKey = "cart"; // Default cart key for guests

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
      cartKey = `cart_${userId}`;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  // Load cart for specific user
  useEffect(() => {
     if (!token) {
      toast("You must be logged in to place an order.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      navigate("/login");
      return;
    }
    const data = JSON.parse(localStorage.getItem(cartKey)) || [];
    setItems(data);
  }, [cartKey]);

  const removeItem = (id) => {
    const updated = items.filter((i) => i._id !== id);
    setItems(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  const total = items
    .reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0)
    .toFixed(2);

  const handleBuy = () => {
    if (!token) {
      toast("You must be logged in to place an order.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      navigate("/login");
      return;
    }

    const order = {
      items,
      total,
      status: "Ready to Place",
      placedAt: new Date().toISOString(),
    };

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem(cartKey);
    navigate("/buy");
  };

  const handleTrack = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    if (!order) {
      toast.error("No order found.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      return;
    }

    let nextStatus = "Ready to Place";
    if (order.status === "Ready to Place") nextStatus = "On the Way";
    else if (order.status === "On the Way") nextStatus = "Delivered";

    order.status = nextStatus;
    localStorage.setItem("order", JSON.stringify(order));
    toast(`Order Status: ${nextStatus}`,{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-3">Your Cart</h1>
        <p className="text-gray-600 mb-4">Cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border p-4 rounded shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  ₹{item.price?.toFixed(2)} × {item.quantity || 1}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-green-700">
                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="mt-2 text-red-600 underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 border rounded bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xl font-bold text-blue-800">
          Total Amount: ₹{total}
        </p>
        <div className="space-x-3">
          <button
            onClick={handleBuy}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Buy
          </button>
          <button
            onClick={handleTrack}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}
