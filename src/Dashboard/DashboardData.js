import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "../FirebaseInit.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ListGroup } from "react-bootstrap";
import BreadcrumbNav from "../Navbar/BreadcrumNav.js";

function DashboardData() {
  const [parentKeys, setParentKeys] = useState([]);
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    const testRef = ref(db);

    const unsubscribe = onValue(testRef, (snapshot) => {
      const keys = snapshot.exists() ? Object.keys(snapshot.val()) : [];
      setParentKeys(keys);
    }, (error) => {
      console.error("Error fetching data:", error);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  const handleItemClick = (key) => {
    // Navigate to the next page with the key as a parameter
    navigate(`/Data-Dashboard/${key}`);
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
          <h1>Receive Data:</h1>
          <ListGroup>
            {parentKeys.map((key, index) => (
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

export default DashboardData;
