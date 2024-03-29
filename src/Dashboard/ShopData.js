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


function UserData({selectedColor}) {
  const Category = 0
  const ItemID = 1
  const ItemName = 2
  const Price = 3

  const { parentKeys, data, ValueName } = GetData();
  const [editableFields, setEditableFields] = useState({
    [parentKeys[2]]: false,
    [parentKeys[1]]: false,
  });

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
      set(ref(db, `Shop/${ValueName}/${field}`), inputData);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    });
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
          <Card className="p-5 card rounded-5">
            <Row>
              <Col>
                <h1 className="pb-3 text-light">{data && data[parentKeys[ItemName]]}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-start-5 p-3">
                <Form>
                  <Form.Group>
                    <Form.Label>{parentKeys[ItemID]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[ItemID]]}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[ItemName]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[ItemName]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[ItemName]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[ItemName],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[ItemName]]) {
                            saveData(
                              parentKeys[ItemName],
                              editedValues[parentKeys[ItemName]]
                            );
                          }
                          toggleEditMode(parentKeys[ItemName]);
                        }}
                      >
                        {editableFields[parentKeys[ItemName]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[Category]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[Category]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[Category]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[Category],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[Category]]) {
                            saveData(
                              parentKeys[Category],
                              editedValues[parentKeys[Category]]
                            );
                          }
                          toggleEditMode(parentKeys[Category]);
                        }}
                      >
                        {editableFields[parentKeys[Category]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[Price]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[Price]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[Price]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[Price],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[Price]]) {
                            saveData(
                              parentKeys[Price],
                              editedValues[parentKeys[Price]]
                            );
                          }
                          toggleEditMode(parentKeys[Price]);
                        }}
                      >
                        {editableFields[parentKeys[Price]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>
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
