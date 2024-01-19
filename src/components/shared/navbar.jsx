import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ApplicationService from "../../services/Application.service";
import { useLocation } from "react-router-dom";

const appService = new ApplicationService();

export const ApplicationNavbar = () => {

    const [currentUser, setCurrentUser] = useState(null)

    const location = useLocation();

    useEffect(() =>{ 
        const userInfo = appService.userInfoJsonStringToObject() || {};
        console.log('RENDER NAVBAR',userInfo);
        try {
            if (!appService.objectIsEmpty(userInfo)) {
                const { user_info: { person } } = userInfo;
                setCurrentUser(person.name);
                console.log('Object NOt empty');
            } else {
                console.log('Object empty');
                setCurrentUser(null);
            }
    
        } catch (error) {
            console.error('Error getting the data...');
            
        }
    },[location])
    

    return (
        <Navbar expand="lg" className="bg-dark" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Suerre Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser ? (
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Check it out!" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Check it out!" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="login">Login</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}