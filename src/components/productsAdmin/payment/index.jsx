import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import PaymentService from "../../../services/ProductsService/PaymentMethod.service";
import { NavLink } from "react-router-dom";

export const PaymentIndex = () => {
    const paymentService = new PaymentService();
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all' or 'available'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                setError(null);

                let paymentList;

                if (filter === 'all') {
                    paymentList = await paymentService.getPaymentMethods();
                } else if (filter === 'available') {
                    paymentList = await paymentService.getAvailablePaymentMethods();
                }

                setPayments(paymentList || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [filter]);

    const toggleAvailableState = async (paymentId, currentAvailableState) => {
        try {
            // Call the service method to toggle available state
            if (!currentAvailableState) {
                await paymentService.toggleAvailableState(paymentId, true);
            } else {
                await paymentService.toggleAvailableState(paymentId, false);
            }

            // Update the payments state with the new data
            setPayments((prevPayments) =>
                prevPayments.map((payment) =>
                    payment.id === paymentId ? { ...payment, available: !currentAvailableState } : payment
                )
            );

        } catch (error) {
            console.error(`Error toggling available state: ${error.message}`);
        }
    };

    return (
        <div>
            <NavLink to={`/product/admin/payment/create`}>
                <Button variant="primary" >Create a Product!</Button>
            </NavLink>           
             <Button onClick={() => setFilter(filter === 'all' ? 'available' : 'all')}>
                {filter === 'all' ? 'Show Available' : 'Show All'}
            </Button>
            <NavLink to={'/product/admin/'}> 
                <Button variant="primary" >Go back to admin panel!</Button>
            </NavLink>
            <h2>Payment Method List</h2>
            {loading ? (
                <p>Loading payment methods...</p>
            ) : error ? (
                <p>Error fetching payment methods: {error}</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.method}</td>
                                    <td>
                                        <NavLink to='/coming/soon/admin'>
                                        <Button variant="primary">
                                            <FaEdit /> Edit
                                        </Button>
                                        </NavLink>
                                        <Button
                                            variant={payment.available ? "success" : "danger"}
                                            onClick={() => toggleAvailableState(payment.id, payment.available)}
                                        >
                                            {payment.available ? <FaCheck /> : <FaTimes />}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div>
                                <h3>No Payment Methods found</h3>
                                {/* Add your logic for creating a new payment method */}
                            </div>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};
