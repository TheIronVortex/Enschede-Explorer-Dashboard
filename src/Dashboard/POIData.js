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
import OverviewInput from "./OverviewInput";


function UserData() {

  //const Cooldown = 0;
  var Description = 0;
  var Location = 1;
  //const Ownership = 3;
  var PoiID = 2;
  var PoiName = 3;
  var PoiType = 4;

  const { parentKeys, data, ValueName } = GetData();
  const [editableFields, setEditableFields] = useState({
    [parentKeys[2]]: false,
    [parentKeys[1]]: false,
  });

  if (parentKeys && parentKeys.includes("Ownership")) {
    var Ownership = 2;
    PoiID++;
    PoiName++;
    PoiType++;
  } 

  if (parentKeys && parentKeys.includes("Cooldowns")) {
    var Cooldown = 0;
    Description++;
    Location++;
    Ownership++;
    PoiID++;
    PoiName++;
    PoiType++;
  } 
  
  //console.log(Cooldown, Description, Location, Ownership, PoiID, PoiName, PoiType)
  
  const cooldownKeys = data ? Object.keys(data[parentKeys[0]]) : [];
  // const cooldownValues = data ? Object.values(data[parentKeys[0]]) : [];
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
      if (cooldownKeys.includes(field)) {
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

  /*
  const handleSaveCooldown = () => {
    // Save all cooldown keys and values
    Object.keys(editedValues[parentKeys[0]]).forEach((key) => {
      saveData(key, editedValues[parentKeys[0]][key]);
    });
    // Toggle edit mode for all cooldown keys
    toggleEditMode(parentKeys[0]);
  };
  */

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
                <h1 className="pb-3 text-light">{data && data[parentKeys[PoiName]]}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-start-5 p-3">
                <Form>
                  <Form.Group>
                    <Form.Label>{parentKeys[PoiID]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[PoiID]]}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[PoiName]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[PoiName]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[PoiName]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[PoiName],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[PoiName]]) {
                            saveData(
                              parentKeys[PoiName],
                              editedValues[parentKeys[PoiName]]
                            );
                          }
                          toggleEditMode(parentKeys[PoiName]);
                        }}
                      >
                        {editableFields[parentKeys[PoiName]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[PoiType]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[PoiType]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[PoiType]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[PoiType],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[PoiType]]) {
                            saveData(
                              parentKeys[PoiType],
                              editedValues[parentKeys[PoiType]]
                            );
                          }
                          toggleEditMode(parentKeys[PoiType]);
                        }}
                      >
                        {editableFields[parentKeys[PoiType]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>{parentKeys[Location]}:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[Location]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[Location]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[Location],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[Location]]) {
                            saveData(
                              parentKeys[Location],
                              editedValues[parentKeys[Location]]
                            );
                          }
                          toggleEditMode(parentKeys[Location]);
                        }}
                      >
                        {editableFields[parentKeys[Location]] ? "Save" : "Edit"}
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
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserData;
