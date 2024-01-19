import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const ProductPictureForm = ({pictureGroups,setPictureGroups}) => {
 

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedGroups = [...pictureGroups];
    updatedGroups[index] = {
      ...updatedGroups[index],
      [name]: files ? files[0] : value,
    };
    setPictureGroups(updatedGroups);
  };

  const handleAddGroup = () => {
    setPictureGroups((prevGroups) => [
      ...prevGroups,
      { product_id: null, description: null, image: null },
    ]);
};

  return (
    <div>
      {pictureGroups.map((group, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <Form.Group controlId={`product_id_${index}`}>
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product ID"
              name="product_id"
              onChange={(e) => handleChange(e, index)}
            />
          </Form.Group>

          <Form.Group controlId={`image_${index}`}>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => handleChange(e, index)}
            />
          </Form.Group>

          <Form.Group controlId={`description_${index}`}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              name="description"
              onChange={(e) => handleChange(e, index)}
            />
          </Form.Group>
        </div>
      ))}

      <Button variant="primary" type="button" onClick={handleAddGroup}>
        Add Picture Group
      </Button>

      {/* <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit All Pictures
      </Button> */}
    </div>
  );
};

