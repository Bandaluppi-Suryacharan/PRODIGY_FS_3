import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';



export default function Buy() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please login to place an order.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      navigate("/login");
      return;
    }
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder) {
      setOrderStatus(savedOrder.status || "Ready to Place");
    }
  }, []);

  const handleNext = async () => {
  if (step === 1 && !address.trim()) {
    toast("Please enter a delivery address.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
    return;
  }

  if (step === 2) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("You must be logged in to place an order.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "https://buy-buddy-backend-ege6.onrender.com/api/order",
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderData = {
        address: res.data.address,
        status: res.data.status,
      };

      localStorage.setItem("order", JSON.stringify(orderData));
      localStorage.removeItem("cart");
      setOrderStatus(orderData.status);
      setStep(step + 1);
    } catch (err) {
      toast("Order failed. Please try again.",{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
      console.error(err);
    }

    return;
  }

  setStep(step + 1);
};

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {step === 1 && (
        <>
          <label className="block font-semibold mb-2">Shipping Address:</label>
          <textarea
            rows="4"
            className="w-full border p-2 rounded mb-4"
            value={address}
            placeholder="Flat / House No. · Street · City · Pincode"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="p-4 border rounded bg-gray-50">
            <p>✅ Cash on Delivery</p>
            <small className="text-gray-500">
              You’ll pay when the package arrives.
            </small>
          </div>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white mt-6 px-6 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <ul className="space-y-2 ml-4 list-decimal">
            <li className={`font-bold ${orderStatus !== "Ready to Place" ? "text-green-700" : "text-yellow-700"}`}>
              Ready to Place {orderStatus !== "Ready to Place" && "✔️"}
            </li>
            <li className={`font-bold ${orderStatus === "On the Way" || orderStatus === "Delivered" ? "text-green-700" : "text-gray-500"}`}>
              On the Way {orderStatus === "On the Way" && "🚚"}
            </li>
            <li className={`font-bold ${orderStatus === "Delivered" ? "text-green-700" : "text-gray-500"}`}>
              Delivered {orderStatus === "Delivered" && "📦"}
            </li>
          </ul>

          <button
            onClick={handleReturnHome}
            className="bg-blue-600 text-white mt-6 px-6 py-2 rounded"
          >
            Back to Shop
          </button>
        </>
      )}
    </div>
  );
}
