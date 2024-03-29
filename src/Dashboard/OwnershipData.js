import { Button, Card, Col, Row } from "react-bootstrap";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import GetData from "./GatherData";
import Form from "react-bootstrap/esm/Form";
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import db from "../FirebaseInit";


function OwnershipData({selectedColor}) {

  const {data, ValueName} = GetData();
  const ownershipData = data && data['Ownership'];
  const upgradeData = ownershipData && ownershipData['Upgrades'];
  const damageData = upgradeData && upgradeData['Damage'];
  const healthData = upgradeData && upgradeData['Health'];
  const rewardsData = upgradeData && upgradeData['Rewards'];

  const currentOwner = ownershipData && ownershipData["UserOwner"];
  const interactionCount = ownershipData && ownershipData["InteractionCount"];

  const damageIncrease = damageData && damageData["DamageIncrease"]; 
  const damageLevel = damageData && damageData["DamageLevel"]; 
  
  const health = healthData && healthData["Health"];
  const healthLevel = healthData && healthData["HealthLevel"];
  const healthMax = healthData && healthData["HealthMax"];

  const interactionBonus = rewardsData && rewardsData["InteractionBonus"];
  const interactionBonusLevel = rewardsData && rewardsData["InteractionBonusLevel"];
  const interest = rewardsData && rewardsData["Interest"];
  const interestLevel = rewardsData && rewardsData["InterestLevel"];

  // eslint-disable-next-line 
  var editDamageData = [];
  // eslint-disable-next-line 
  var editHealthData = [];
  // eslint-disable-next-line 
  var editRewardData = [];

  const [editableFields, setEditableFields] = useState({
    currentOwner: false,
    interactionCount: false,
    damageData: false,
    healthData: false,
    rewardsData: false,
  });

  const toggleEditMode = (field) => {
    setEditableFields(prevState => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the state of the clicked field
    }));
    //console.log(editableFields);
  };

  const [userNameList, setUserNamesList] = useState([]);


  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, 'Users');
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        const userNames = Object.values(userData).map(user => user.PlayerName);
        setUserNamesList(userNames);
      });
    };

    fetchData();

  }, []);

  //console.log(userNameList);

  const saveData = (field, value) => {

    //console.log(`POIs/${ValueName}/Ownership/${field}`,value);
    switch (field){
      case "UserOwner":
        set(ref(db, `POIs/${ValueName}/Ownership/${field}`), value);
        break;
      case "InteractionCount":
        set(ref(db, `POIs/${ValueName}/Ownership/${field}`), parseInt(value));
        break;
      case "Damage":
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/DamageIncrease`), parseInt(value[0]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/DamageLevel`), parseInt(value[1]))
        break;
      case "Health":
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/Health`), parseInt(value[0]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/HealthLevel`), parseInt(value[1]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/HealthMax`), parseInt(value[2]))
        break;
      case "Rewards":
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/InteractionBonus`), parseInt(value[0]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/InteractionBonusLevel`), parseInt(value[1]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/Interest`), parseInt(value[2]))
        set(ref(db, `POIs/${ValueName}/Ownership/Upgrades/${field}/InterestLevel`), parseInt(value[3]))
        break;
      default:
        console.log(field + " is not a valid case") 
        break
    }
     
    console.log(`Saving ${field} with value ${value}`);
  };
  
  //console.log(currentOwner)
  
  return (
    <>
      <Row>
        <Col>
          <BreadcrumbNav />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-5 card rounded-5" style={{ '--primary-color': selectedColor }}>
            <Row>
              <Col>
                <h1 className="pb-3 text-light">Ownership: {ValueName} </h1>
              </Col>
            </Row>
            <Row>
              <Col md className="bg-white rounded-5 p-3">
                <Form>
                  <Form.Group>
                    <Form.Label>Current Owner:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Select
                        id="currentOwner"
                        disabled={!editableFields["currentOwner"]}
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={currentOwner}
                      >
                        {currentOwner && (
                          <option key={currentOwner} value={currentOwner}>
                            {currentOwner}
                          </option>
                        )}

                        {userNameList.map((username) => {
                          if (username !== currentOwner) {
                            return (
                              <option key={username} value={username}>
                                {username}
                              </option>
                            );
                          }
                          return null;
                        })}
                      </Form.Select>
                      <Button
                        variant="secondary"
                        className="ms-2"
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
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Interaction Count:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control 
                        id = "interactionCount"
                        disabled = {!editableFields["interactionCount"]}
                        type="number"
                        className="ms-4 bg-light"
                        style={{ width: "95%" }}
                        defaultValue={interactionCount}
                      />
                      <Button
                        variant="secondary"
                        className="ms-2"
                        style={{ '--primary-color': selectedColor }}
                        onClick={() => {
                          if (editableFields["interactionCount"]) {
                            saveData(
                              "InteractionCount",
                              document.getElementById("interactionCount").value
                            );
                          }
                          toggleEditMode("interactionCount");
                        }}
                      >
                        {editableFields["interactionCount"] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </Form.Group>
                  <hr />
                  <Row>
                    <h3>Damage</h3>
                    <Col>
                      <Form.Group>
                        <Form.Label>Damage Increase:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="damageIncrease"
                            disabled = {!editableFields["damageData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={damageIncrease}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Damage Level:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="damageLevel"
                            disabled = {!editableFields["damageData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={damageLevel}
                          />
                          <Button
                            variant="secondary"
                            className="ms-2"
                            style={{ '--primary-color': selectedColor }}
                            onClick={() => {
                              if (editableFields["damageData"]) {
                                saveData(
                                  "Damage",
                                  editDamageData = [
                                    document.getElementById("damageIncrease").value,
                                    document.getElementById("damageLevel").value
                                  ]
                                );
                              }
                              toggleEditMode("damageData");
                            }}
                          >
                            {editableFields["damageData"] ? "Save" : "Edit"}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row> 
                  <hr />
                  <Row>
                    <h3 className="p-2">Health</h3>
                    <Col>
                      <Form.Group>
                        <Form.Label>Current Health:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="health"
                            disabled = {!editableFields["healthData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={health}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Health Level:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="healthLevel"
                            disabled = {!editableFields["healthData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={healthLevel}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Health Max:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="healthMax"
                            disabled = {!editableFields["healthData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={healthMax}
                          />
                          <Button
                            variant="secondary"
                            className="ms-2"
                            style={{ '--primary-color': selectedColor }}
                            onClick={() => {
                              if (editableFields["healthData"]) {
                                saveData(
                                  "Health",
                                  editHealthData = [
                                    document.getElementById("health").value,
                                    document.getElementById("healthLevel").value,
                                    document.getElementById("healthMax").value
                                  ]
                                );
                              }
                              toggleEditMode("healthData");
                            }}
                          >
                            {editableFields["healthData"] ? "Save" : "Edit"}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row> 
                  <hr />
                  <Row>
                    <h3 className="p-2">Interaction</h3>
                    <Col>
                      <Form.Group>
                        <Form.Label>Interaction Bonus:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="interactionBonus"
                            disabled = {!editableFields["rewardsData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={interactionBonus}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Interaction Bonus Level:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="interactionBonusLevel"
                            disabled = {!editableFields["rewardsData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={interactionBonusLevel}
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Interest:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="interest"
                            disabled = {!editableFields["rewardsData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={interest}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Interest Level:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            id="interestLevel"
                            disabled = {!editableFields["rewardsData"]}
                            type="number"
                            className="ms-4 bg-light"
                            style={{ width: "95%" }}
                            defaultValue={interestLevel}
                          />
                          <Button
                            variant="secondary"
                            className="ms-2"
                            style={{ '--primary-color': selectedColor }}
                            onClick={() => {
                              if (editableFields["rewardsData"]) {
                                saveData(
                                  "Rewards",
                                  editRewardData = [
                                    document.getElementById("interactionBonus").value,
                                    document.getElementById("interactionBonusLevel").value,
                                    document.getElementById("interest").value,
                                    document.getElementById("interestLevel").value
                                  ]
                                );
                              }
                              toggleEditMode("rewardsData");
                            }}
                          >
                            {editableFields["rewardsData"] ? "Save" : "Edit"}
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row> 
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OwnershipData;