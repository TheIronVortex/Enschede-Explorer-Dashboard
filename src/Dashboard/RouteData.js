import React, { useState, useEffect } from "react";
import GetData from "./GatherData";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import Form from "react-bootstrap/esm/Form";
import { ref, set } from "firebase/database";
import {db} from "../FirebaseInit";
import RouteMap from "./RouteMap";


function UserData({selectedColor, selectedTextColor}) {
  const PoiIDList = 0;
  const Description = 1;
  const RouteDistance = 2;
  const RouteID = 3;
  const RouteName = 4;
  const RouteTime = 5;

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
      set(ref(db, `Routes/${ValueName}/${field}`), inputData);
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
          <Card className="p-5 card rounded-5" style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
            <Row>
              <Col>
                <h1 className="pb-3 text-custom">{data && data[parentKeys[RouteName]]}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-start-5 p-3">
                <Form>
                  <Form.Group>
                    <Form.Label>{parentKeys[RouteID]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[RouteID]]}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[RouteName]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[RouteName]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[RouteName]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[RouteName],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2 text-custom"
                        onClick={() => {
                          if (editableFields[parentKeys[RouteName]]) {
                            saveData(
                              parentKeys[RouteName],
                              editedValues[parentKeys[RouteName]]
                            );
                          }
                          toggleEditMode(parentKeys[RouteName]);
                        }}
                      >
                        {editableFields[parentKeys[RouteName]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[PoiIDList]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[PoiIDList]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[PoiIDList]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[PoiIDList],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2 text-custom"
                        onClick={() => {
                          if (editableFields[parentKeys[PoiIDList]]) {
                            saveData(
                              parentKeys[PoiIDList],
                              editedValues[parentKeys[PoiIDList]]
                            );
                          }
                          toggleEditMode(parentKeys[PoiIDList]);
                        }}
                      >
                        {editableFields[parentKeys[PoiIDList]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>
                  {//<RouteMap PoiList={data && data[parentKeys[PoiIDList]]} />
                  }
                  <Form.Group>
                    <Form.Label>{parentKeys[RouteDistance]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[RouteDistance]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[RouteDistance]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[RouteDistance],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2 text-custom"
                        onClick={() => {
                          if (editableFields[parentKeys[RouteDistance]]) {
                            saveData(
                              parentKeys[RouteDistance],
                              editedValues[parentKeys[RouteDistance]]
                            );
                          }
                          toggleEditMode(parentKeys[RouteDistance]);
                        }}
                      >
                        {editableFields[parentKeys[RouteDistance]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[RouteTime]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[RouteTime]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[RouteTime]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[RouteTime],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2 text-custom"
                        onClick={() => {
                          if (editableFields[parentKeys[RouteTime]]) {
                            saveData(
                              parentKeys[RouteTime],
                              editedValues[parentKeys[RouteTime]]
                            );
                          }
                          toggleEditMode(parentKeys[RouteTime]);
                        }}
                      >
                        {editableFields[parentKeys[RouteTime]] ? "Save" : "Edit"}
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
                        className="ms-2 text-custom"
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
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserData;
