import React, {useEffect ,useState } from "react";
import AuthService from "../services/Auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LocalStorageService from "../services/LocalStorage.service";

export const Signup= () => {
    const service = new AuthService();

    const localStorage = new LocalStorageService();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    useEffect(() => {
        console.log(formData);
    }, [formData])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value

        }));
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await service.signup(formData);
            localStorage.saveToken(response.token)
            console.log(response.token)
        }
        catch (error) {
            alert('Something went wrong!', error);
        }
    };

    return (
        <div className="">
            <h1>SIgn Up</h1>
            <Form >
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={formData.email} name="email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else !!!!!!.
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