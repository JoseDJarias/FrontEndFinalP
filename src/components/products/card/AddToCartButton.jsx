import React, { useContext,useState } from "react";
import { Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { CartContext } from "../../context/CartProductsContext";

export const AddToCartButton = ({ product }) => {
    const { setProducts } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);


    const addToCart = () => {
        setProducts('HOla');
        setShowModal(true);
        console.log('Producto que agrego:',product);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button variant="success" onClick={addToCart}>Add to Cart</Button>
            <CustomModal
                show={showModal}
                handleClose={handleCloseModal}
                title="Product Added to Cart"
                body={<p>The product has been added to your cart.</p>}
            />

        </>
    );
};
