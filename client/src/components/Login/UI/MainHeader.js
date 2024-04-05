import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button, Row, Col} from 'react-bootstrap';


const MainHeader = () => {
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">Group Chat App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Login</Nav.Link>
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    );
}

export default MainHeader;