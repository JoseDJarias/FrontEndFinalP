import { createContext, useState } from "react";

const CartContext = createContext(
    {
        products: '',
        setProducts: () => { }
    }
);

const CartProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    return (
        <CartContext.Provider value={{ products, setProducts }}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider};



