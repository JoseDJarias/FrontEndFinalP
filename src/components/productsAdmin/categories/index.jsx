import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import CategoryService from "../../../services/ProductsService/Category.service";
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export const CategoryIndex = () => {
    const categoryService = new CategoryService();
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all' or 'available'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                let categoryList;

                if (filter === 'all') {
                    categoryList = await categoryService.getCategories();
                } else if (filter === 'available') {
                    categoryList = await categoryService.getAvailableCategories();
                }

                setCategories(categoryList || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [filter]);




    //   const handleUpdate = async (categoryId, categoryData) => {
    //     try {
    //       const updatedCategory = await categoryService.updateCategory(categoryId, categoryData);
    //       console.log('Category updated:', updatedCategory);
    //     } catch (error) {
    //       console.error('Error updating category:', error.message);
    //     }
    //   };

    const toggleAvailableState = async (categoryId, currentAvailableState) => {
        try {
            // Call the service method to toggle available state
            if (!currentAvailableState) {
              await categoryService.toggleAvailableState(categoryId, true);
            } else {
              await categoryService.toggleAvailableState(categoryId, false);
            }
      
            // Update the products state with the new data
            setCategories((prevCategories) =>
              prevCategories.map((category) =>
                category.id === categoryId ? { ...category, available: !currentAvailableState } : category
              )
            );
      
          } catch (error) {
            console.error(`Error toggling available state: ${error.message}`);
          }
    };

    return ( 
        <div>
            <NavLink to={'/product/admin/category/create'}> 
                <Button variant="primary" >Create a Categorie!</Button>
            </NavLink>
            <Button onClick={() => setFilter(filter === 'all' ? 'available' : 'all')}>
                {filter === 'all' ? 'Show Available' : 'Show All'}
            </Button>
            <h2>Category List</h2>
            {loading ? (
                <p>Loading categories...</p>
            ) : error ? (
                <p>Error fetching categories: {error}</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        {/* <NavLink to={`/product/admin/category/edit`}> */}
                                        <Button variant="primary">
                                            <FaEdit /> Edit
                                        </Button>
                                        {/* </NavLink> */}
                                        <Button
                                            variant={category.available ? "success" : "danger"}
                                            onClick={() => toggleAvailableState(category.id, category.available)}
                                        >
                                            {category.available ? <FaCheck /> : <FaTimes />}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div>
                                <h3>No Categories found</h3>
                                <NavLink to={`/product/admin/category/create`}>
                                    <Button variant="primary">Create a Category!</Button>
                                </NavLink>
                            </div>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};
