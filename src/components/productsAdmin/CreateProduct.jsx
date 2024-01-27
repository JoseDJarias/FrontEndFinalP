import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProductService from "../../services/ProductsService/Product.service";
import { useNavigate } from "react-router-dom";
import { ProductPictureForm } from "./ProductPictureForm";
import CategoryService from "../../services/ProductsService/Category.service";
import { NavLink } from "react-router-dom";

export const CreateProduct = () => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [categories, setCategories] = useState([]);
  // pics state
  const [pictureGroups, setPictureGroups] = useState([
    { product_id: '', description: null, image: null },
  ]);


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unitary_price: "",
    purchase_price: "",
    stock: "",
    available: true, // You might want to provide a default value
    category_id: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };


  const handleSubmit = async () => {
    try {
      const response = await productService.createProduct(formData);
      debugger
      if (response.id) {
        const products = await productService.getAllProducts();
        const latestProduct = products[products.length - 1];

        addPictures(latestProduct.id);

      }
      console.log("Product  created successfully");
      navigate('/product/admin');
    } catch (error) {
      console.error('Error creating product ', error.message);
    }
  };


  const addPictures = (productId) => {
    console.log("Submitting picture groups:", pictureGroups);
    pictureGroups.forEach(async (group) => {
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("image", group.image);
      formData.append("description", group.description);
      await productService.createProductPicture(formData);
    });
  }

  return (
    <div className="">
      <NavLink to='/product/admin/'>
        <Button variant="primary" >Go back to admin panel!</Button>
      </NavLink>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            onChange={handleChange}
            value={formData.description}
            name="description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="unitary_price">
          <Form.Label>Unitary Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter unitary price"
            onChange={handleChange}
            value={formData.unitary_price}
            name="unitary_price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="purchase_price">
          <Form.Label>Purchase Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter purchase price"
            onChange={handleChange}
            value={formData.purchase_price}
            name="purchase_price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            onChange={handleChange}
            value={formData.stock}
            name="stock"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="available">
          <Form.Check
            type="checkbox"
            label="Available"
            checked={formData.available}
            onChange={handleCheckboxChange}
            name="available"
          />
        </Form.Group>
        <Form.Group controlId="category_id">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <ProductPictureForm pictureGroups={pictureGroups} setPictureGroups={setPictureGroups}
        />


        <Button variant="primary" type="button" onClick={handleSubmit}>
          Create Product
        </Button>

      </Form>
    </div>
  );
};
