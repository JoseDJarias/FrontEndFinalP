import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ApplicationService from "../../services/Application.service";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileService from "../../services/Profile.service";

export const UserProfile = () => {

    const [checkProfileData, setCheckProfileData] = useState(false)

    const navigate = useNavigate();

    const location = useLocation();
    
    const [formData, setFormData] = useState({
      user_name: "",
        name: "",
        lastname: "",
        birthdate: "",
        city: "",
        country: "",
        phone_number:""
      });

    useEffect(()=> {
      const {state} = location;
      if (!!state && !!state.checkProfileData) {
        setCheckProfileData(state.checkProfileData);
      }
    },[location]);


    useEffect(() => {
        console.log(checkProfileData?.valueOf());
        const appService = new ApplicationService();
        const userInfo = appService.userInfoJsonStringToObject() || {};

        const { user_info: { person }  } = userInfo;

        setFormData({
            user_name: person?.user_name || "",
            name: person?.name || "",
            lastname: person?.lastname || "",
            birthdate: person?.birthdate || "",
            city: person?.city || "",
            country: person?.country || "",
            phone_number: person?.phone_number || ""
        });
        
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        
    }

    const handleSubmit = async () => {
        try {
          const profileService = new ProfileService();  
          const response = await profileService.updateUserProfile(formData)
          window.alert('Profile Succesfully Updated:')
          console.log('Updated response:',response);

        } catch (error) {
            alert('Something went wrong!', error);
        }
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignupClick = () => {
        navigate('/signup');
    }
    return (
        <div className="">
          {checkProfileData  && (
            <NavLink to="/product/cart/checkout">
              <Button>Go back to proceed with the payment</Button>
            </NavLink>
          )}
      
          {formData && (
            <Form>
              <Form.Group className="mb-3" controlId="user_name">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.user_name} name="user_name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.name} name="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.lastname} name="lastname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="birthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="date" onChange={handleChange} value={formData.birthdate} name="birthdate" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.city} name="city" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.country} name="country" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" onChange={handleChange} value={formData.phone_number} name="phone_number" />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          )}
      
          {!checkProfileData && !formData && (
            <>
              <h2>Not Registered or Logged in yet? </h2>
              <h3>What are you waiting for ....</h3>
              <span>Check our links: </span>
              <Button variant="primary" onClick={handleLoginClick}>
                Login
              </Button>
              <Button variant="primary" onClick={handleSignupClick}>
                Signup
              </Button>
            </>
          )}
        </div>
      );
}