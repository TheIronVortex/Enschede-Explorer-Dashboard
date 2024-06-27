import React, { useRef, useState, useEffect } from 'react';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';
import { db } from '../FirebaseInit';
import { child, onValue, ref, set } from 'firebase/database';

function NewQRCode() {
  const [QRCodeName, setQRCodeName] = useState('qr-code');
  const [CurrencyRewardValue, setCurrencyRewardValue] = useState(0);
  const [ExperienceRewardValue, setExperienceRewardValue] = useState(0);
  const [CooldownReductionRewardValue, setCooldownReductionRewardValue] = useState(0);
  const [CurrencyReward, setCurrencyReward] = useState(true);
  const [ExperienceReward, setExperienceReward] = useState(false);
  const [CooldownReductionReward, setCooldownReductionReward] = useState(false);
  const [POINames, setPOINames] = useState([]);
  const [selectedPOI, setSelectedPOI] = useState('');
  const qrRef = useRef();

  const generateImage = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current);
      return dataUrl;
    } catch (error) {
      console.error('oops, something went wrong!', error);
    }
  };

  useEffect(() => {
    const refPOI = ref(db, "POIs");
    onValue(refPOI, (snapshot) => {
      const POIData = snapshot.val();
      const POINameArray = Object.values(POIData).map(POI => POI.PoiName);
      setPOINames(POINameArray);
    });
  }, []);

  useEffect(() => {
    generateImage();
  }, [QRCodeName]);

  const updateCurrencyReward = (event) => {
    setCurrencyRewardValue(event.target.value);
  };

  const updateExperienceReward = (event) => {
    setExperienceRewardValue(event.target.value);
  };

  const updateCooldownReductionReward = (event) => {
    setCooldownReductionRewardValue(event.target.value);
  };

  const updateQRCode = (event) => {
    setQRCodeName(event.target.value);
  };

  const handleCurrencyRewardChange = (event) => {
    setCurrencyReward(event.target.checked);
  };

  const handleExperienceRewardChange = (event) => {
    setExperienceReward(event.target.checked);
  };

  const handleCooldownReductionRewardChange = (event) => {
    setCooldownReductionReward(event.target.checked);
  };

  const handlePOIChange = (event) => {
    setSelectedPOI(event.target.value);
  };

  const submitData = async () => {
    const dbRef = ref(db, "/QRCodes");
    const CurrencyRewardValueInt = parseInt(CurrencyRewardValue);
    const ExperienceRewardValueInt = parseInt(ExperienceRewardValue);
    const CooldownReductionRewardValueInt = parseInt(CooldownReductionRewardValue);
    const parentRef = child(dbRef, QRCodeName);
  
    const dataUrl = await generateImage();
  
    // Construct the reward object dynamically
    const rewardObj = {};
  
    if (CurrencyReward && CurrencyRewardValueInt > 0) {
      rewardObj.Currency = CurrencyRewardValueInt;
    }
  
    if (ExperienceReward && ExperienceRewardValueInt > 0) {
      rewardObj.Experience = ExperienceRewardValueInt;
    }
  
    if (CooldownReductionReward && selectedPOI && CooldownReductionRewardValueInt > 0) {
      rewardObj.CDR = {
        POIName: selectedPOI,
        Value: CooldownReductionRewardValueInt
      };
    }
  
    set(parentRef, rewardObj)
      .then(() => {
        console.log('New QR-code added successfully');
      })
      .catch((error) => {
        console.error('Error adding new QR-code: ', error);
      });
  
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${QRCodeName}.png`;
    link.click();
  };  
  
  return (
    <>
      <Row>
        <Col className="col-9">
          <Form>
            <Form.Group>
              <Form.Label>QRCode Name: </Form.Label>
              <Form.Control
                type="text"
                value={QRCodeName}
                className="ms-4 bg-light"
                style={{ width: '95%' }}
                onChange={updateQRCode}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Reward Type:</FormLabel>
              <Form.Check
                type="checkbox"
                className="ms-4"
                label="Currency"
                checked={CurrencyReward}
                onChange={handleCurrencyRewardChange}
              />
              <Form.Check
                type="checkbox"
                className="ms-4"
                label="Experience"
                checked={ExperienceReward}
                onChange={handleExperienceRewardChange}
              />
              <Form.Check
                type="checkbox"
                className="ms-4"
                label="Cooldown Reduction"
                checked={CooldownReductionReward}
                onChange={handleCooldownReductionRewardChange}
              />
            </Form.Group>

            {CurrencyReward &&
              <Form.Group>
                <Form.Label>Reward Currency: </Form.Label>
                <Form.Control
                  type="number"
                  value={CurrencyRewardValue}
                  className="ms-4 bg-light"
                  style={{ width: '95%' }}
                  onChange={updateCurrencyReward}
                />
              </Form.Group>
            }

            {ExperienceReward &&
              <Form.Group>
                <Form.Label>Reward Experience: </Form.Label>
                <Form.Control
                  type="number"
                  value={ExperienceRewardValue}
                  className="ms-4 bg-light"
                  style={{ width: '95%' }}
                  onChange={updateExperienceReward}
                />
              </Form.Group>
            }

            {CooldownReductionReward &&
              <>
                <Form.Group>
                  <Form.Label>Location:</Form.Label>
                  <Form.Select
                    className="ms-4 bg-light"
                    style={{ width: '95%' }}
                    value={selectedPOI} 
                    onChange={handlePOIChange}
                  >
                    <option value="">Select a POI</option>
                    {POINames.map((name, index) => (
                      <option key={index} value={name}>{name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Reward Cooldown Reduction (in secconds): </Form.Label>
                  <Form.Control
                    type="number"
                    value={CooldownReductionRewardValue}
                    className="ms-4 bg-light"
                    style={{ width: '95%' }}
                    onChange={updateCooldownReductionReward}
                  />
                </Form.Group>
              </>
            }

            <Button
              className="mt-2"
              type="button"
              onClick={submitData}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <div ref={qrRef}>
            <QRCode value={`https://enschede-explorer.firebaseapp.com/${QRCodeName}`} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NewQRCode;
