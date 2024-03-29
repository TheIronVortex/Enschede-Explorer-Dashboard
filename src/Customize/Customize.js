import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function Customize({ setSelectedColor }) {
  const [color, setColor] = useState(() => {
    const storedColor = localStorage.getItem('selectedColor');
    return storedColor ? storedColor : '#e20d18';
  });

  useEffect(() => {
    localStorage.setItem('selectedColor', color);
    setSelectedColor(color);
  }, [color, setSelectedColor]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <Col>
      <Card className="p-5 card rounded-5" style={{ '--primary-color': color }}>
        <Row>
          <Col>
            <input type="color" value={color} onChange={(e) => handleColorChange(e.target.value)} />
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default Customize;
