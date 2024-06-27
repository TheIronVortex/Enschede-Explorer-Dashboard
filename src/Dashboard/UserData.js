import React, { useState, useEffect } from "react";
import GetData from "./GatherData";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import Form from "react-bootstrap/esm/Form";
import { ref, set, get, child, update } from "firebase/database";
import { db, auth} from "../FirebaseInit";
import { useNavigate } from 'react-router-dom';
import 'firebase/database';


function UserData({selectedColor, selectedTextColor}) {
  //var Character = 0;
  var Description = 1;
  //eslint-disable-next-line 
  //var Inventroy = 2
  var PlayerName = 3;
  var Progression = 4;
  var UserID = 5;

  const navigate = useNavigate();
  const { parentKeys, data, ValueName } = GetData();

  if (parentKeys.includes('FriendData')) {
    console.log("FriendData Included");
    //var FriendRequest = 2 ;
    //Inventroy ++;
    PlayerName ++;
    Progression ++;
    UserID ++;
  }

  if (parentKeys.includes('Admin')) {
    console.log("Admin Included");
    //const Admin = 0 
    //Character ++;
    Description ++;
    //FriendRequest ++;
    //Inventroy ++;
    PlayerName ++;
    Progression ++;
    UserID ++;
  }

  if (parentKeys.includes('Achievements')) {
    console.log("Achievements Included");
    //var Achievements = 0;
    //Admin ++;
    //Character ++;
    Description ++;
    //FriendRequest ++;
    //Inventroy ++;
    PlayerName ++;
    Progression ++;
    UserID ++;
  }

  //console.log(data && data[parentKeys[Progression]])

  const [editableFields, setEditableFields] = useState({
    [parentKeys[2]]: false,
    [parentKeys[1]]: false,
  });

  const progressKeys = data ? Object.keys(data[parentKeys[Progression]]) : [];
  const progressValues = data ? Object.values(data[parentKeys[Progression]]) : [];
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

  //console.log(data && data[parentKeys[UserID]]);     

  const saveData = (field, value) => {
    if (value !== undefined) {
      // Update player name
      console.log(field + parentKeys[PlayerName])
      if (field === parentKeys[PlayerName]) {
        //const parentRef = ref(db, 'Users');
        const newValue = value.trim();
        const oldKey = ValueName; // Assuming ValueName holds the old key of the user
        const newKey = newValue;

        console.log(auth)
        const user = undefined;
        if (user) {
          
          user.updateProfile({
            displayName: newValue
          }).then(() => {
            console.log("User display name updated successfully");

            const parentRef = ref(db, 'Users'); 
            get(child(parentRef, oldKey)).then((snapshot) => {
              if (snapshot.exists()) {
                //const data = snapshot.val();
                update({
                  [`Users/${newKey}/${field}`]: value
                }).then(() => {
                  console.log("User entry updated successfully");
                  navigate(`/User-Dashboard/Users/${newKey}`); 
                  window.location.reload();
                }).catch((error) => {
                  console.error("Error updating user entry: ", error);
                });
              } else {
                console.error("User data not found for ", oldKey);
              }
            }).catch((error) => {
              console.error("Error getting user data: ", error);
            });
          }).catch((error) => {
            console.error("Error updating user display name: ", error);
          });
        } else {
          console.error("No user is currently signed in");
        }
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
    Object.keys(editedValues[parentKeys[Progression]]).forEach((key) => {
      saveData(key, editedValues[parentKeys[Progression]][key]);
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
      <Row>
        <Col>
          <Card className="p-5 card rounded-5" style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
            <Row>
              <Col>
                <h1 className="pb-3 text-custom">{data && data[parentKeys[PlayerName]]}</h1>
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
                        className="ms-2 text-custom"
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
                        className="mt-2 text-custom"
                        onClick={() => {
                          console.log(editedValues[parentKeys[Progression]]);
                          if (editableFields[parentKeys[Progression]] && editedValues[parentKeys[Progression]] !== undefined ) {
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
