import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "../FirebaseInit.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ListGroup, Form } from 'react-bootstrap';
import BreadcrumbNav from '../Navbar/BreadcrumNav.js';

function SpecificDataPage() {
  const { ParentKey } = useParams(); // Access the key from URL params

  const [parentKeys, setParentKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    const testRef = ref(db, "/" + ParentKey);

    const unsubscribe = onValue(testRef, (snapshot) => {
      const keys = snapshot.exists() ? Object.keys(snapshot.val()) : [];
      setParentKeys(keys);
      setFilteredKeys(keys); // Initialize filtered keys with all keys
    }, (error) => {
      console.error("Error fetching data:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [ParentKey]); 

  const handleItemClick = (ValueName) => {
    // Append the new key to the existing URL keys using the delimiter "/"
    const newUrl = `/Data-Dashboard/${ParentKey}/${ValueName}`;
    navigate(newUrl);
  };  

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    // Filter the keys based on the search term
    const filtered = parentKeys.filter(key =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredKeys(filtered);
  };

  return (
    <>
      <Row>
        <Col>
          <BreadcrumbNav />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Receive Specific Data:</h1>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col>

            </Col>
          </Row>
          <ListGroup>
            {filteredKeys.map((key, index) => (
              <ListGroup.Item key={index}>
                {/* Trigger handleItemClick function on click */}
                <a className="text-decoration-none text-dark d-block" onClick={() => handleItemClick(key)}>{key}</a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default SpecificDataPage;
