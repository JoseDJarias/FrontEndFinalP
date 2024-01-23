import React, { useState } from "react";
import PaymentService from "../../../services/ProductsService/PaymentMethod.service";
import { Button, Form } from "react-bootstrap";


export const CreatePaymentMethod = () => {
  const paymentService = new PaymentService();

  const [formData, setFormData] = useState({
    method: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleSubmit = async () => {
    try {
      const response = await paymentService.createPaymentMethod(formData);
      console.log(response);
      // Handle success
    } catch (error) {
      console.error("Error creating payment method:", error.message);
      // Handle error
    }
  };

  return (
    <div className="">
      <Form>
        <Form.Group controlId="method">
          <Form.Label>Method</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter payment method"
            onChange={handleChange}
            value={formData.method}
            name="method"
          />
        </Form.Group>

        <Form.Group controlId="available">
          <Form.Check
            type="checkbox"
            label="Available"
            checked={formData.available}
            onChange={handleChange}
            name="available"
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Create Payment Method
        </Button>
      </Form>
    </div>
  );
};
