"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { productsData } from "@/public/ProductData";
import { useRouter } from "next/navigation";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Home() {
  const [cart, setCart] = useState([]); // State to manage cart items
  const router = useRouter(); // Router to navigate between pages

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Add product to cart and update localStorage
  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Navigate to the cart page
  const handleCart = () => {
    router.push("/cart");
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 px-2 xl:px-8 py-5 xl:py-8 rounded-md shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-xl xl:text-3xl font-bold">Products</h1>
          </div>
          <div>
            <IconButton
              aria-label="cart"
              onClick={handleCart}
              sx={{ color: "white" }}
            >
              <Badge badgeContent={cart.length} color="warning">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
