"use client"
// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) =>{
    const initialQuantity = localStorage.getItem('quantity') || 0;
    const [quantity, setQuantity] = useState(parseInt(initialQuantity));

  
    useEffect(() => {
      localStorage.setItem('quantity', quantity.toString());
    }, [quantity]);

  return (
    <CartContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
