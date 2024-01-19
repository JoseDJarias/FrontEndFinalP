import { useState } from "react";
import ProductsService from "../../services/Product.service";
import { Button, Form } from "react-bootstrap";

export const CreateCategories = () =>{
    const productService = new ProductsService();

    const [formData, setFormData] = useState({
      name: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async () => {
      try {
        const response = await productService.createCategory(formData);
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
  
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Create Category
          </Button>
        </Form>
      </div>
    );
}