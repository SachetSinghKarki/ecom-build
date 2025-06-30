"use client";

import { Product } from "@/sanity.types";
import { useBasketStore } from "@/store/store";
import { useEffect, useState } from "react";


interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return( 
  <div className="flex items-center justify-center space-x-2">
    <button 
    onClick={()=> removeItem(product._id)}
    disabled={disabled || itemCount <= 0}
    className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm transition-colors duration-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}

    >
        <span className={`text-xl font-bold ${itemCount===0 ? "text-gray-400" : "text-gray-600"}`}>-</span>

    </button>
    <span className="w-8 text-center font-semibold">{itemCount}</span>
    <button
    onClick={()=> addItem(product)}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm transition-colors duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        <span className="text-xl font-bold">+</span>
    </button>
  </div>
)}

export default AddToBasketButton;
