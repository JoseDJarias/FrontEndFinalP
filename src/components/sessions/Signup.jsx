import React, { useEffect, useState } from "react";
import AuthService from "../services/Auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LocalStorageService from "../services/LocalStorage.service";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const service = new AuthService();

    const localStorage = new LocalStorageService();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        person: {
            user_name: "",
            name: "",
            lastname: "",
            birthdate: "",
            city: "",
            country: ""
        }
    });


    useEffect(() => {
        console.log(formData);
    }, [formData])



    const handleChange = (e) => {
        // Extracting 'name' and 'value' from the input field
        const { name, value } = e.target;
      
        // Checking if the 'name' includes "person."
        if (name.includes("person.")) {
          // If 'name' includes "person.", it means it's a person field
          // Extract the actual person field name (e.g., "user_name")
          const personField = name.split(".")[1];
      
          // Update the state using the spread operator to preserve the existing state
          // Update the 'person' object with the new value for the specific person field
          setFormData((prevData) => ({
            ...prevData,
            person: {
              ...prevData.person,
              [personField]: value
            }
          }));
        } else {
          // If 'name' does not include "person.", it's a regular field
          // Update the state with the new value for the regular field
          setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
        }
      };
      

    const handleSubmit = async () => {
        try {
            const response = await service.signup(formData);
            localStorage.saveToken(response)
            navigate('/')
            console.log(response)
        }
        catch (error) {
            alert('Something went wrong!', error);
        }
    };

    return (
        <div className="">
          <h1>Sign Up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                name="password"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="user_name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                onChange={handleChange}
                value={formData.person.user_name}
                name="person.user_name"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={handleChange}
                value={formData.person.name}
                name="person.name"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                onChange={handleChange}
                value={formData.person.lastname}
                name="person.lastname"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="birthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                onChange={handleChange}
                value={formData.person.birthdate}
                name="person.birthdate"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={handleChange}
                value={formData.person.city}
                name="person.city"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                onChange={handleChange}
                value={formData.person.country}
                name="person.country"
              />
            </Form.Group>
      
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      );
      
};
