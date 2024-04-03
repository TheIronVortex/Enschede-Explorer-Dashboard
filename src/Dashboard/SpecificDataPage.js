import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import {db} from "../FirebaseInit.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ListGroup, Form } from 'react-bootstrap';
import BreadcrumbNav from '../Navbar/BreadcrumNav.js';

function SpecificDataPage({selectedColor}) {
  const { ParentKey } = useParams(); // Access the key from URL params

  const [parentKeys, setParentKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
                <Link to={`/Data-Dashboard/${ParentKey}/${key}`} className="text-decoration-none text-dark d-block" >{key}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default SpecificDataPage;
