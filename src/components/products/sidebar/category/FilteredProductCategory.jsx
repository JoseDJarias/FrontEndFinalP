// Sidebar.jsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export const FilteredProductCategory = ({ categories, onCategoryChange }) => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    console.log('Selected Category:', categoryId);
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div>
      <h2>Categories</h2>
      <Form>
        {categories.map((category) => (
          <Form.Check
            key={category.id}
            type="checkbox"
            label={category.name}
            value={category.id}
            checked={selectedCategory === category.id}
            onChange={handleCategoryChange}
          />
        ))}
      </Form>
    </div>
  );
};

