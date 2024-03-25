import React, { useState, useEffect } from "react";
import GetData from "./GatherData";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import Form from "react-bootstrap/esm/Form";
import { ref, set } from "firebase/database";
import db from "../FirebaseInit";


function UserData() {
  //const Character = 0;
  const Description = 1;
  const PlayerName = 2;
  const Progression = 3;
  const UserID = 4;


  const { parentKeys, data, ValueName } = GetData();
  const [editableFields, setEditableFields] = useState({
    [parentKeys[2]]: false,
    [parentKeys[1]]: false,
  });

  const progressKeys = data ? Object.keys(data[parentKeys[3]]) : [];
  const progressValues = data ? Object.values(data[parentKeys[3]]) : [];
  const [editedValues, setEditedValues] = useState({
    [parentKeys[2]]: "",
    [parentKeys[1]]: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);

  const toggleEditMode = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: !editableFields[field],
    });
  };

  const saveData = (field, value) => {
    if (value !== undefined) {
      // Update player name
      if (field === parentKeys[2]) {
        //setParentKey(value); // Update parentKey state
      }
      var inputData = value;
      const dataToUpdate = {};
      dataToUpdate[field] = inputData;
      if (progressKeys.includes(field)) {
        inputData = parseInt(value);
        set(ref(db, `Users/${ValueName}/Progression/${field}`), inputData);
      } else {
        set(ref(db, `Users/${ValueName}/${field}`), inputData);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    });
  };

  const handleSaveProgress = () => {
    // Save all progress keys and values
    Object.keys(editedValues[parentKeys[3]]).forEach((key) => {
      saveData(key, editedValues[parentKeys[3]][key]);
    });
    // Toggle edit mode for all progress keys
    toggleEditMode(parentKeys[3]);
  };

  if (loading) {
    return <div>Fetching Data...</div>;
  }
  
  return (
    <>
      <Row>
        <Col>
          <BreadcrumbNav />
        </Col>
      </Row>
      {/*
        <h1>{data && data.PoiName}</h1>
        {data && (
          <ListGroup>
            {parentKeys.map((key, index) => (
              <ListGroup.Item key={index}>
                {key}: {typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      */}
      <Row>
        <Col>
          <Card className="p-5 bg-secondary rounded-5">
            <Row>
              <Col>
                <h1 className="pb-3 text-light">{data && data[parentKeys[PlayerName]]}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-start-5 p-3">
                <Form>
                  <Form.Group>
                    <Form.Label>{parentKeys[UserID]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[UserID]]}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[PlayerName]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[PlayerName]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[PlayerName]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[PlayerName],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[PlayerName]]) {
                            saveData(
                              parentKeys[PlayerName],
                              editedValues[parentKeys[PlayerName]]
                            );
                          }
                          toggleEditMode(parentKeys[PlayerName]);
                        }}
                      >
                        {editableFields[parentKeys[PlayerName]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[Description]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <textarea
                        disabled={!editableFields[parentKeys[Description]]}
                        className="form-control ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[Description]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[Description],
                            e.target.value
                          )
                        }
                      ></textarea>
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[Description]]) {
                            saveData(
                              parentKeys[Description],
                              editedValues[parentKeys[Description]]
                            );
                          }
                          toggleEditMode(parentKeys[Description]);
                        }}
                      >
                        {editableFields[parentKeys[Description]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Col>
              <Col md className="bg-white rounded-end-5 p-3">
                <Form>
                  <Row>
                    <Col md={10}>
                      <Form.Group>
                        <div className="d-flex">
                          {progressKeys.map((key, index) => (
                            <div key={index} className="me-3">
                              <div>{key}:</div>
                              <Form.Control
                                disabled={!editableFields[parentKeys[Progression]]}
                                type="number"
                                className="bg-light"
                                defaultValue={progressValues[index]}
                                onChange={(e) =>
                                  handleInputChange(parentKeys[Progression], {
                                    ...editedValues[parentKeys[Progression]],
                                    [key]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={2} className="p-3 align-self-end">
                      <Button
                        variant="secondary"
                        className="mt-2"
                        onClick={() => {
                          if (editableFields[parentKeys[Progression]]) {
                            handleSaveProgress();
                          }
                          toggleEditMode(parentKeys[Progression]);
                        }}
                      >
                        {editableFields[parentKeys[Progression]] ? "Save" : "Edit"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserData;
