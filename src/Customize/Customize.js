import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

//const fs = require('fs');

function Customize({ setSelectedColor, setSelectedTextColor }) {
  const [textColor, setTextColor] = useState(() =>{
    const textColor = localStorage.getItem('selectedTextColor');
    return textColor ? textColor : '#ffffff';
  })
  const [colorPrimary, setColorPrimary] = useState(() => {
    const storedColor = localStorage.getItem('selectedColorPrimary');
    return storedColor ? storedColor : '#e20d18';
  });

  useEffect(() => {
    localStorage.setItem('selectedColorPrimary', colorPrimary);
    localStorage.setItem('selectedTextColor', textColor);
    setSelectedColor(colorPrimary);
    setSelectedTextColor(textColor);
    }, [colorPrimary, setSelectedColor, textColor, setSelectedTextColor]);

  const handleColorChange = (newColor, newTextColor) => {
    setColorPrimary(newColor);
    setTextColor(newTextColor)
  };

  const resetColor = () => {
    setColorPrimary('#e20d18');
    setTextColor('#ffffff');
  };

  return (
    <Col>
      <Card className="p-5 card rounded-5" style={{ '--primary-color': colorPrimary, '--text-color': textColor }}>
        <h1 className='text-custom'>Customization</h1>
        <div className='p-4 rounded-5 bg-white'>
          <Row>
            <Col>
              <Row>
                <Col className='col-auto'>
                  <h4>Primary Colour: </h4>
                </Col>
                <Col>
                  <input type="color" value={colorPrimary} onChange={(e) => handleColorChange(e.target.value, textColor)} />
                </Col>
              </Row>
            <hr />
              <Row>
                <Col className='col-auto'>
                  <h4>Text Colour: </h4>
                </Col>
                <Col>
                  <input type="color" value={textColor} onChange={(e) => handleColorChange(colorPrimary, e.target.value)} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Button className='btn'  onClick={resetColor}>Reset</Button>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
}

export default Customize;
