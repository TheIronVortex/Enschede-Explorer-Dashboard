import React, { useState } from "react";
import GetData from "./GatherData";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import Form from "react-bootstrap/esm/Form";
import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { ref, remove } from "firebase/database";
import { db } from "../FirebaseInit";
import { useNavigate } from 'react-router-dom';

function QRCodeData({selectedColor, selectedTextColor}) {

  const {data, ValueName} = GetData();
  const Currency = data && data['Currency'];
  const Experience = data && data['Experience']

  const CDR = data && data['CDR']
  const CooldownReduction = CDR && CDR['Value']
  const CooldownPOI = CDR && CDR['POIName']

  const Redeemed = data && data['Redeemed'];

  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  
  function confirmDelete() {
    setShowConfirmation(!showConfirmation);
  };
  
  function deleteQRCode() {
    const parentRef = ref(db, `QRCodes/${ValueName}`);
    
    remove(parentRef)
      .then(() => {
        console.log('QRCode deleted successfully');
        navigate(`/Data-Dashboard/QRCodes`)
      })
      .catch((error) => {
        console.error('Error deleting POI: ', error);
      });
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
          <Card className="p-5 card rounded-5" style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
            <Row>
              <Col>
                <h1 className="pb-3 text-custom">{ValueName}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-5 p-3">
                <Row>
                  <Col className="col-9">
                    <Form>
                      {Currency && 
                        <Form.Group>
                          <Form.Label>Currency Reward: </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control
                              disabled
                              type="number"
                              className="ms-4 bg-light"
                              style={{ width: "95%" }}
                              defaultValue={Currency}
                            />
                            {/*
                            <Button
                              variant="secondary"
                              className="ms-2 text-custom"
                              style={{ '--primary-color': selectedColor }}
                              onClick={() => {
                                if (editableFields["currentOwner"]) {
                                  saveData(
                                    "UserOwner",
                                    document.getElementById("currentOwner").value
                                  );
                                }
                                toggleEditMode("currentOwner");
                              }}
                            >
                              {editableFields["currentOwner"] ? "Save" : "Edit"}
                            </Button>
                            */}
                          </div>
                        </Form.Group>
                      }
                      {Experience && 

                        <Form.Group>
                          <Form.Label>Experience Reward: </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control
                              disabled
                              type="number"
                              className="ms-4 bg-light"
                              style={{ width: "95%" }}
                              defaultValue={Experience}
                            />
                          </div>
                        </Form.Group>
                      }
                      {CooldownPOI && 
                        <Form.Group>
                          <Form.Label>Cooldown Location: </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control
                              disabled
                              type="text"
                              className="ms-4 bg-light"
                              style={{ width: "95%" }}
                              defaultValue={CooldownPOI}
                            />
                          </div>
                        </Form.Group>
                      }
                      {CooldownReduction && 
                        <Form.Group>
                          <Form.Label>Cooldown Reduction Reward: </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control
                              disabled
                              type="number"
                              className="ms-4 bg-light"
                              style={{ width: "95%" }}
                              defaultValue={CooldownReduction}
                            />
                          </div>
                        </Form.Group>
                      }
                      
                      <Form.Group className="mt-4">
                        <Form.Label>Redeemed:</Form.Label>
                        <div>
                          {Redeemed && Object.entries(Redeemed).map(([key, value]) => (
                            <Form.Check
                              key={key}
                              type="checkbox"
                              label={key}
                              checked={value}
                              disabled
                              className="ms-4"
                            />
                          )) || <p>No Redeems Yet</p>}
                        </div>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <QRCode value={`https://enschede-explorer.firebaseapp.com/${ValueName}`} />
                    <Button className="ms-5 mt-2">
                      Download QR-Code
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="text-custom text-decoration-none" onClick={confirmDelete}>Delete POI</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={confirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this QR-code?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteQRCode}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QRCodeData;