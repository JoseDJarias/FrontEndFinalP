import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import ApplicationService from "../../../services/Application.service";

export const AddToCartButton = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const applicationService = new ApplicationService();


    const addToCart = () => {
        setShowModal(true);
        const setProducts = {
            name: product.name,
            description: product.description,
            productId: product.id,
            unitaryPrice: product.unitary_price,
            quantity : 1
        }
        applicationService.addToCart(setProducts)

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
