import db from "../FirebaseInit.js";
import { ref, set } from "firebase/database";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

function SendDataToDatabase(event) {
  event.preventDefault();

  const inputData = document.getElementById("InputData").value;
  
  set(ref(db, 'test/'), {
    Test: inputData
  });
}

function AddData() {
  return (
    <Row>
      <Col className="py-5">
        <h1>Add Data:</h1>
        <Form onSubmit={SendDataToDatabase}>
          <Form.Group>
            <Form.Label>Input Text Here</Form.Label>
            <Form.Control type="text" id="InputData" />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default AddData;
