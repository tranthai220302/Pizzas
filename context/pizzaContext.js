"use client"
// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

const PizzasContext = createContext();

export const PizzasProvider = ({ children }) =>{
  let initialPizzas;
    if(localStorage.getItem('pizzas')){
      initialPizzas = JSON.parse(localStorage.getItem('pizzas')) || [];
    }else{
      initialPizzas = []
    }

    const [pizzas, setPizzas] = useState(initialPizzas);

    useEffect(() => {
      localStorage.setItem('pizzas',  JSON.stringify(pizzas));
    }, [pizzas]);

  return (
    <PizzasContext.Provider value={{ pizzas, setPizzas }}>
      {children}
    </PizzasContext.Provider>
  );
}

export default PizzasContext;
