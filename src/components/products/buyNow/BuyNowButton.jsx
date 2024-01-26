import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CustomModal from "../card/CustomModal";
import ApplicationService from "../../../services/Application.service";

export const BuyNowButton = ({ product }) => {

    const [showModal, setShowModal] = useState(false);

    const applicationService = new ApplicationService();

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleOpenModal = () => {
        setShowModal(true)
    }

    const addToCart = () =>{
        const setProducts = {
            name: product.name,
            description: product.description,
            productId: product.id,
            unitaryPrice: product.unitary_price,
            quantity : 1
        }
        applicationService.addToCart(setProducts)

    }

    return (
        <>
            <Button variant="primary" onClick={handleOpenModal}>Buy Now</Button>
            <CustomModal
                show={showModal}
                handleClose={handleCloseModal}
                title={`Product ${product.name} ready to get buy it`}
                body={
                    <>
                        <NavLink to='/product/cart'>
                            <Button variant="success" onClick={addToCart}>
                                <p>Buy Now </p>
                            </Button>
                        </NavLink>

                        <Button variant="primary" onClick={handleCloseModal}>
                            <p>Continue to explore items</p>
                        </Button>
                    </>
                }
            />

        </>
    );
}