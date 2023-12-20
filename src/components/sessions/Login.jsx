import React from "react";
import AuthService from "../services/Auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const Login = () => {

    const service = new AuthService;
    
  
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
      
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value
        }));
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        service
          .login(formData)
          .then((payload) => console.log(payload))
          .catch((err) => {
            alert('Something went wrong!');
          });
      }
    
      return (
        <div className="">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={formData.email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
}