import React, { useState, useEffect } from "react";
import GetData from "./GatherData";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import Form from "react-bootstrap/esm/Form";
import { ref, set, get, child } from "firebase/database";
import {db} from "../FirebaseInit";
import { Link, useParams } from 'react-router-dom';
import Map from "./PoiMap";
import { useNavigate } from 'react-router-dom';

function POIData({selectedColor, selectedTextColor}) {

  const { ParentKey } = useParams();
  var Description = 0;
  var Location = 1;
  var PoiID = 2;
  var PoiName = 3;
  var PoiType = 4;

  const navigate = useNavigate();
  const { parentKeys, data, ValueName } = GetData();
  const [customLocation, setCustomLocation] = useState(() => null); 
  const [customStartLocation, setCustomStartLocation] = useState();
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
        const parentRef = ref(db, 'POIs');
        const newValue = value.trim();
        const oldKey = ValueName;
        const newKey = newValue;
  
        get(child(parentRef, oldKey)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            set(child(parentRef, oldKey), null)
              .then(() => {
                set(child(parentRef, newKey), data)
                  .then(() => {
                    console.log("Parent entry updated successfully");
                    set(ref(db, `POIs/${newKey}/${field}`), value);
                    navigate(`/Data-Dashboard/POIs/${newKey}`);
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error updating parent entry: ", error);
                  });
              })
              .catch((error) => {
                console.error("Error removing old entry: ", error);
              });
          } else {
            console.error("POI data not found for ", oldKey);
          }
        }).catch((error) => {
          console.error("Error getting POI data: ", error);
        });
      }
  
      var inputData = value;
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
    set(ref(db, `POIs/${ValueName}/Location`), locationData)
    //Workaround for map reload
    window.location.reload();
  };

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    });
  };

  const handleLocationChange = (lngLat) => {
    setCustomLocation(lngLat);
    //console.log(customLocation)
  };
  
  //Sent POI starting location to the map
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
      const locationData = data[parentKeys[Location]]; 
      if (locationData) {
        const [lng, lat] = locationData.split(',').map(coord => parseFloat(coord.trim())); 
        setCustomStartLocation([lat, lng]); 
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
          <Card className="p-5 card rounded-5" style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
            <Row>
              <Col>
                <h1 className="pb-3 text-custom">{data && data[parentKeys[PoiName]]}</h1>
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
                        <Button className="ms-2 text-custom" as={Link} to={`/Data-Dashboard/${ParentKey}/${ValueName}/Ownership`}>Ownership</Button>
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
                        className="ms-2 text-custom"
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
                        className="ms-2 text-custom"
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
                          className="ms-2 text-custom"
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
                      <Map customStartLocation={customStartLocation} onLocationChange={handleLocationChange} locationSave={saveLocationData}/>
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

export default POIData;
