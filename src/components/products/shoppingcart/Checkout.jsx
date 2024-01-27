import React, { useEffect, useState } from 'react';
import ApplicationService from '../../../services/Application.service';
import PaymentService from '../../../services/ProductsService/PaymentMethod.service';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './checkout.css'
import BillService from '../../../services/ProductsService/Bills.service';

export const Checkout = () => {

    const paymentMethodService = new PaymentService();
    const applicationService = new ApplicationService();
    const billService = new BillService();

    const navigate = useNavigate();

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [userData, setUserData] = useState({
        user_id: null,
        person: {}
    })
    const [cartProducts, setCartProducts] = useState([])

    const [formData, setFormData] = useState({
        payment_method_id: "",
        user_id: "",
        products: {}
    });

    useEffect(() => {

        try {
            const fechtPaymentMethods = async () => {
                const response = await paymentMethodService.getPaymentMethods() || {}
                setPaymentMethods(response)
            }
            fechtPaymentMethods()
        } catch (error) {
            console.error('Error fetching payment methods data:', error);
        }

        try {
            const userInfo = applicationService.userInfoJsonStringToObject() || {}
            if (!applicationService.objectIsEmpty(userInfo)) {
                const { user_info: { id, person } } = userInfo;
                setUserData({ user_id: id, person: person });

                setFormData((prevData) => ({
                    ...prevData,
                    user_id: id,
                }));
            }
        } catch (error) {
            console.error('Error fetching payment methods data:', error);
        }

        try {
            const fetchCartProducst = async () => {
                const response = await applicationService.getCart();
                if (response) {
                    console.log('receiving', response);
                    setCartProducts(response);
                }
            };

            fetchCartProducst();

        } catch (error) {
            console.error('Error fetching payment methods data:', error);

        }

    }, []);

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNavigateToProfile = () => {

        navigate('/profile', { state: { checkProfileData: true } });
    };

    const calculateTotal = (products) => {
        return products.reduce((total, product) => {
            return total + product.unitaryPrice * product.quantity;
        }, 0).toFixed(2);
    };

    const handleVoucherChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            voucher: file,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await billService.createBill(formData.voucher, {
                payment_method_id: formData.payment_method_id,
                user_id: userData.user_id,
                products: cartProducts.map(product => ({
                    quantity: product.quantity,
                    unitaryPrice: product.unitaryPrice,
                    productId: product.productId,
                })),
            });
            response ? handleResponse(true) : handleResponse(false)

        } catch (error) {
            console.error('Error creating bill:', error);
        }
    }

    const handleResponse = (state) => {

        return (
            <div className={state ? 'sucess-response ' : 'failed-response'}>
                {state ? (
                    <p>Sucessfull Response </p>
                ) : (
                    <p>Failed Response </p>
                )}
            </div>
        )
    }

    return (
        <div className="container">
            {userData.user_id ? (
                <>
                    <Button className="checkout-button" onClick={handleNavigateToProfile}>
                        <p>Checkout Personal Info and Adress!</p>
                    </Button>

                    {cartProducts && cartProducts.length > 0 ? (
                        <>
                            <div className="product-section">
                                {cartProducts.map((product) => (
                                    <div key={product.productId} className="product-item">
                                        <p className="product-title">{product.name}</p>
                                        <p className="product-price">Price: {product.unitaryPrice}</p>
                                        <p className="product-description">Description: {product.description}</p>
                                        <p className="product-quantity">Quantity: {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="total-price">
                                <p>Total: {calculateTotal(cartProducts)}</p>
                            </div>
                        </>
                    ) : (
                        <p className="no-products">No products added to buy yet</p>
                    )}



                    <FormGroup>
                        {paymentMethods && paymentMethods.length > 0 ? (
                            <Form.Control
                                as="select"
                                name="payment_method_id"
                                value={formData.payment_method_id}
                                onChange={handlePaymentChange}
                                className="payment-method-select"
                            >
                                <option value="">Select a payment method!</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.method}
                                    </option>
                                ))}
                            </Form.Control>
                        ) : (
                            <p className="no-payment-methods">No available payment methods</p>
                        )}
                    </FormGroup>

                    <Form.Group className="voucher-upload">
                        <Form.Label> Please attach here the voucher</Form.Label>
                        <Form.Control
                            type="file"
                            name="voucher"
                            onChange={handleVoucherChange}
                        />
                    </Form.Group>

                    <Button className="finish-payment-button" onClick={handleSubmit}>
                        Finish Payment
                    </Button>
                </>
            ) : (
                <div className="not-authorized-section">
                    <h3>Must need to be authorized, please sign up or login</h3>
                    <NavLink to="../../signup">
                        <Button variant="success">Click to Register</Button>
                    </NavLink>
                    <NavLink to="../../login">
                        <Button variant="success">Click if you already have an account</Button>
                    </NavLink>
                </div>
            )}
        </div>
    );

}