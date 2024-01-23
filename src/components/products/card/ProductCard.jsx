import './product-card.css'
import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { AddToCartButton } from './AddToCartButton';

export const ProductCard = ({ product}) => {


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:3000/${product.product_pictures[0]?.image_url}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Price: {product.unitary_price}
        </Card.Text>
        <Button variant="primary">Buy Now</Button>
        <AddToCartButton product={product}/>
   
      </Card.Body>
    </Card>
  );
}