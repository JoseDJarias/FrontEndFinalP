// ShoppingCart.js
import React, { useEffect, useContext } from 'react';
import { CartContext } from "../../context/CartProductsContext";

export const ShoppingCart = ({ }) => {
  const { products } = useContext(CartContext);

  useEffect(()=>{
    console.log('Consuming products', products);
  },[products])

  return (
    <div>
      <h2>Shopping Cart</h2>



    </div>
  );
};

