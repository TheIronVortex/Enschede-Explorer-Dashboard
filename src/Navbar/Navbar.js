import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';

function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Test">Test</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Data-Dashboard">Data Dashboard</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
