import React from 'react';
import { Form } from 'react-bootstrap';

export const FilteredProductPrice = ({ onRangeFilter }) => {
  
  return (
    <div>
      <h2>Filter by Price Range</h2>
      <Form.Check
        key={1}
        type="checkbox"
        label={'0-50'}
        value={1}
        onChange={()=>{onRangeFilter(1)}}
      />
      <Form.Check
        key={2}
        type="checkbox"
        label={'50-100'}
        value={2}
        onChange={()=>{onRangeFilter(2)}}
      />
      <Form.Check
        key={3}
        type="checkbox"
        label={'100-150'}
        value={3}
        onChange={()=>{onRangeFilter(3)}}
      />
      <Form.Check
        key={4}
        type="checkbox"
        label={'150-250'}
        value={4}
        onChange={()=>{onRangeFilter(4)}}
      />
    </div>
  );
};

