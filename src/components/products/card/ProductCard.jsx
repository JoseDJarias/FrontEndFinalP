import './product-card.css'
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import CustomModal from './CustomModal';

export const ProductCard = ({ product,addToCart }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:3000/${product.product_pictures[0]?.image_url}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Price: {product.unitary_price}
        </Card.Text>
        <Button variant="primary">Buy Now</Button>
        <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>

        <CustomModal
          show={showModal}
          handleClose={handleCloseModal}
          title="Product Added to Cart"
          body={<p>The product has been added to your cart.</p>}
        />
      </Card.Body>
    </Card>
  );
}