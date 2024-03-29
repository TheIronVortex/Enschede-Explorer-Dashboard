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
import { Link, useParams } from 'react-router-dom';
import Map from "./PoiMap";

function POIData({selectedColor}) {

  const { ParentKey } = useParams();
  var Description = 0;
  var Location = 1;
  var PoiID = 2;
  var PoiName = 3;
  var PoiType = 4;

  const { parentKeys, data, ValueName } = GetData();
  const [customLocation, setCustomLocation] = useState(() => null); // Initialize with null
  const [editableFields, setEditableFields] = useState({
    [parentKeys[2]]: false,
    [parentKeys[1]]: false,
  });

  if (parentKeys && parentKeys.includes("Ownership")) {

    //var Ownership = 2;
    PoiID++;
    PoiName++;
    PoiType++;
  } 

  if (parentKeys && parentKeys.includes("ImageLocation")) {
    // eslint-disable-next-line
    var ImageLocation = 1;
    
    Location++;
    PoiID++;
    PoiName++;
    PoiType++;
  }

  if (parentKeys && parentKeys.includes("Cooldowns")) {

    //var Cooldown = 0;
    Description++;
    Location++;
    // eslint-disable-next-line
    ImageLocation++;
    //Ownership++;
    PoiID++;
    PoiName++;
    PoiType++;
  } 
    
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

      if (field === parentKeys[PoiName]) {
        //setParentKey(value); // Update parentKey state
      }
      
      var inputData = value;
      //console.log(value);
      const dataToUpdate = {};
      dataToUpdate[field] = inputData;
      set(ref(db, `POIs/${ValueName}/${field}`), inputData);

      if (field === parentKeys[Location]) {
        const [lng, lat] = value.split(',').map(coord => parseFloat(coord.trim())); 
        setCustomLocation([lat, lng]); 
      }
    }
  };

  const saveLocationData = () => {
    const locationData = `${customLocation[1]}, ${customLocation[0]}`
    console.log(`POIs/${ValueName}/Location`);
    set(ref(db, `POIs/${ValueName}/Location`), locationData)
  };

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    });
  };

  const handleLocationChange = (lngLat) => {
    setCustomLocation(lngLat);
    console.log(customLocation)
  };
  
  //Sent POI starting location to the map
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
      const locationData = data[parentKeys[Location]]; 
      if (locationData) {
        const [lng, lat] = locationData.split(',').map(coord => parseFloat(coord.trim())); 
        setCustomLocation([lat, lng]); 
      }
    }
  }, [data, parentKeys, Location]);  
  
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

      <Row>
        <Col>
          <Card className="p-5 card rounded-5">
            <Row>
              <Col>
                <h1 className="pb-3 text-light">{data && data[parentKeys[PoiName]]}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-5 p-3">
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
                      {parentKeys && parentKeys.includes("Ownership") && (
                        <Button className="ms-2 btn-secondary" as={Link} to={`/Data-Dashboard/${ParentKey}/${ValueName}/Ownership`}>Ownership</Button>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>POI Name:</Form.Label>
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
                    <Form.Label>Image Location:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        disabled={!editableFields[parentKeys[ImageLocation]]}
                        type="text"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={data && data[parentKeys[ImageLocation]]}
                        onChange={(e) =>
                          handleInputChange(
                            parentKeys[ImageLocation],
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => {
                          if (editableFields[parentKeys[ImageLocation]]) {
                            saveData(
                              parentKeys[ImageLocation],
                              editedValues[parentKeys[ImageLocation]]
                            );
                          }
                          toggleEditMode(parentKeys[ImageLocation]);
                        }}
                      >
                        {editableFields[parentKeys[ImageLocation]] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>POI Type:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Select                         
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
                      >
                        <option value={0}>General</option>
                        <option value={1}>History</option>
                        <option value={2}>Leisure</option>
                      </Form.Select>

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
                    <Form.Label>Location:</Form.Label>
                    <div>
                      <Map customLocation={customLocation} onLocationChange={handleLocationChange} locationSave={saveLocationData}/>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Description:</Form.Label>
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

export default POIData;
