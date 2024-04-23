import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { auth } from '../FirebaseInit';
import { Button, Dropdown } from "react-bootstrap";

function CustomNavbar({ selectedColor, selectedTextColor }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <Navbar bg="light" expand="lg" style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Map">Map</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Data-Dashboard">Data Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Documentation">Documentation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link" activeclassname="active" href="/Customize">Customize Website</Nav.Link>
            </Nav.Item>
            {!loading && user ? (
              <Dropdown>
                <Dropdown.Toggle className='text-custom' variant="light" id="dropdown-basic">
                  Hello, {user.displayName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
            {!loading && !user ? (
              <Button className="text-custom" href="/Login">Login</Button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
