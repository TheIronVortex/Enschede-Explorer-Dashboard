import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import BreadcrumbNav from "../Navbar/BreadcrumNav";
import AddNewRoute from "./AddNewRoute";
import AddNewPOI from "./AddNewPOI";
import AddNewItem from "./AddNewItem";
import AddNewQRCode from "./AddNewQRCode";

function AddNewData({selectedColor, selectedTextColor}) {
  const { ParentKey } = useParams();

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
            <h1 className="text-custom">Add New {ParentKey}</h1>
            <Row>
              <Col md className="bg-white rounded-5 p-3"> 
                {ParentKey === 'Routes' && (
                  <AddNewRoute />
                )}
                {ParentKey === 'POIs' && (
                  <AddNewPOI />
                )}
                {ParentKey === 'Shop' && (
                  <AddNewItem />
                )}
                {ParentKey === 'QRCodes' && (
                  <AddNewQRCode />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
    
  )
}

export default AddNewData;