import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const ApplicationNavbar = () => {
    return (
        <Navbar expand="lg"  className="bg-dark" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Suerre Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Check it out!" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="login">Login</NavDropdown.Item>
                         
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}