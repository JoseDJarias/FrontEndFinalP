import React, {useEffect, useState} from "react";
import AuthService from "../services/Auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LocalStorageService from "../services/LocalStorage.service";

export const Login = () => {

    const service = new AuthService;
    
    const localStorage = new LocalStorageService;
  
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });

      useEffect(()=>{
        console.log(formData);
      },[formData]) 
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        
        }));
      }
      
      const handleSubmit = (e) => {
        // e.preventDefault();
        service
          .login(formData)
          .then(data => {
            console.log(data.token)
            localStorage.saveToken("token", data.token)
          })
          .catch((err) => {
            alert('Something went wrong!',err);
          });
          
      }
    
      return (
        <div className="">
          <h1>Login</h1>
          <Form >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={formData.email} name="email"/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      );
}