import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ApplicationService from "../../services/Application.service";
import { useLocation, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

const appService = new ApplicationService();

export const ApplicationNavbar = () => {

    const [currentUser, setCurrentUser] = useState(null)

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = appService.userInfoJsonStringToObject() || {};
        try {
            if (!appService.objectIsEmpty(userInfo)) {
                const { user_info: { person } } = userInfo;
                setCurrentUser(person.name);
            } else {
                setCurrentUser(null);
            }

        } catch (error) {
            console.error('Error getting the data...');

        }
    }, [location])


    const handleNavigateToProfile = () => {
        // Do any logic before navigating if needed
        // ...

        // Navigate to the profile page with the prop
        navigate('/profile', { checkProfileData: false } );
    };


    return (
        <Navbar expand="lg" className="bg-dark" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Suerre Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser ? (
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/product">Products</Nav.Link>
                            <NavDropdown title="Check it out!" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleNavigateToProfile}>Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/product/purshases">Purshases</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/product/cart"> <TiShoppingCart /> </Nav.Link>

                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/product">Products</Nav.Link>
                            <NavDropdown title="Check it out!" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/product/cart"> <TiShoppingCart /> </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}