import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';


export default function Home() {
  const [products, setProducts] = useState([]);
  const handleAddToCart = (prod) => {
    let userId = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const cartKey = userId ? `cart_${userId}` : "cart";
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const idx = cart.findIndex((i) => i._id === prod._id);
  if (idx !== -1) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ ...prod, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  toast.success(`${prod.name} added to cart!`,{
          style: {
            background: "#0f172a", // dark navy
            color: "#fff",          // text color
  },});
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod._id} product={prod} onAdd={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
