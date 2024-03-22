import React from "react";
import GetData from "./GatherData";
import { ListGroup } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BreadcrumbNav from "../Navbar/BreadcrumNav";

function POIData() {
  const { parentKeys, data } = GetData();

  return (
    <div>
      <Row>
        <Col>
          <BreadcrumbNav />
        </Col>
      </Row>
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
    </div>
  );  
}

export default POIData;
