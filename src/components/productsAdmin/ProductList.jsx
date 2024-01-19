import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ProductService from "../../services/Product.service";
import { FaCheck, FaTimes } from 'react-icons/fa';  // Import the FontAwesome icons


const ProductList = () => {
  const productService = new ProductService();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Implement your edit logic here
    console.log(`Editing product with id ${productId}`);
  };
  
  const toggleAvailableState = async (productId, currentAvailableState) => {
    try {
      // Call the service method to toggle available state
      if (!currentAvailableState) {
        await productService.toggleAvailableState(productId,true);
      }else {
        await productService.toggleAvailableState(productId,false);
      }
      
      // Update the products state with the new data
      setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, available: !currentAvailableState } : product
      )
    );  

    } catch (error) {
      console.error(`Error toggling available state: ${error.message}`);
    }
  };


  return (
    <div>
      <h2>Product List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unitary Price</th>
            <th>Purchase Price</th>
            <th>Stock</th>
            <th>Available</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.unitary_price}</td>
              <td>{product.purchase_price}</td>
              <td>{product.stock}</td>
              <td>{product.available.toString()}</td>
              <td>{product.category_id}</td>
              <td>
                {product.available ? (
                  <Button
                    variant="success"
                    onClick={() => toggleAvailableState(product.id, product.available)}
                  >
                    <FaCheck />
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => toggleAvailableState(product.id, product.available)}
                  >
                    <FaTimes />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
