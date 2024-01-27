import { useEffect, useState } from "react";
import ApplicationService from "../../../services/Application.service";
import "./shopping-cart.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ShoppingCart = () => {

  const applicationService = new ApplicationService();


  const [cart, setCart] = useState([]);

  useEffect(() => {
    const products = applicationService.getCart();
    setCart(products);
  }, [])


  const handleDelete = (productId) => {
    applicationService.deleteFromCart(productId);
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
  };
  const handleQuantityChange = (productId, increase) => {
    console.log(`Handling quantity change for product ID: ${productId}`);

    setCart((prevCart) => {

      const updatedCart = prevCart.map((item) => {
        if (item.productId === productId) {
          // Increase quantity
          if (increase) {
            return { ...item, quantity: item.quantity + 1 };
          }
          // Decrease quantity, ensuring it doesn't go below 1
          else {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
        } else {
          return item;
        }
      });

      return updatedCart;
    });
  };

  const clearItems = () => {

    applicationService.clearCart()
    setCart([])
  }
  return (
    <div className={cart.length > 0 ? "shopping-cart-container" : "no-products-container"}>
        
      <h2>Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <>
          <div className="buttons-container">
            <Button variant="danger" onClick={clearItems}> Clear Items</Button>
            <NavLink to="/product/cart/checkout">
              <Button style={{marginLeft:'10px'}}>Proceed to Checkout!</Button>
            </NavLink>
         
          </div>
          {cart.map(item => (
            <div key={item.productId} className="cart-item">
              <div className="item-details">
                <span className="product-name">{item.name}</span>
                <span className="product-description">{item.description}</span>
                <span className="quantity">Quantity: {item.quantity || 1}</span>
                <span className="unitary-price">Unitary Price: ${item.unitaryPrice.toFixed(2)}</span>
              </div>
              <div className="buttons">
                <Button onClick={() => handleQuantityChange(item.productId, true)}>+</Button>
                <Button onClick={() => handleQuantityChange(item.productId, false)}>-</Button>
                <Button variant="danger" onClick={() => handleDelete(item.productId)}>Delete</Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-products-container">
          <h2 className="no-products-message">No products added yet</h2>
          <NavLink to='/product'>
            <Button className="no-products-button">Press to search products</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

