import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CategoryService from "../../../services/ProductsService/Category.service";

export const CreateCategories = () => {
  const categoryService = new CategoryService();

  const [formData, setFormData] = useState({
    name: "",
    available: true

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));
  };
  const handleSubmit = async () => {
    try {
      const response = await categoryService.createCategory(formData);
      console.log(response);
      // Handle success
    } catch (error) {
      console.error('Error creating category:', error.message);
      // Handle error
    }
  };

  return (
    <div className="">
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            onChange={handleChange}
            value={formData.name}
            name="name"
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
          Create Category
        </Button>
      </Form>
    </div>
  );
}