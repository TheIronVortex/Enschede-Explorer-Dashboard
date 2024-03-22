import { ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import db from "../FirebaseInit.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function RecieveData() {
  
  const [data, setData] = useState(null);

  useEffect(() => {

    const refData = ref(db);

    const unsubscribe = onValue(refData, (snapshot) => {
      const newData = snapshot.val(); 
      setData(newData); 
    }, (error) => {
      console.error("Error fetching data:", error);
    });


    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <Row>
      <Col className="py-5">
        <h1>Receive Data:</h1>
        <pre id="ShowData">{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
      </Col>
    </Row>
  );
}

export default RecieveData;
