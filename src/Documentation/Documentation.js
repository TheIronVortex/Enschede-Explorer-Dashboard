import { Col, Row } from "react-bootstrap";
import FAQ from "./FAQ";

function Documentation() {
  return (
    <>
      <Row>
        <Col>
          <h1>FAQ:</h1>
          <FAQ 
            Question="What does this website do?"
            Answer="This website will assist you in managing the data of Enschede Explorers, you will be able to add, edit and remove data without having to load into the firebase at any point in the process."
          />
          <FAQ 
            Question="How do I edit a POI?"
            Answer={"After locating the POI you want to edit inside of the <a href='/Data-Dashboard/POIs'>Data Dashboard</a> you can click edit on any of the data available and change the value, save these changes by pressing the save button on the edited data"}
          />
          <FAQ 
            Question="How do I delete a POI?"
            Answer={"After locating the POI you want to edit inside of the <a href='/Data-Dashboard/POIs'>Data Dashboard</a> you can click the delete button at the bottom of the page, and then confirm the deletion. This process is not reversable."}
          />
        </Col>  
        <Col sm={2}>
          <h5 className="mt-5 text-center">Documentation</h5>
          <hr />
          <ul className="list-unstyled list-group">
            <li>
              <a className="list-group-item" target="_blank" rel="noreferrer" href="https://firebasestorage.googleapis.com/v0/b/enschede-explorer-v3.appspot.com/o/Documentation%2FTest%20PDF.pdf?alt=media&token=f936381d-b685-478c-ab69-1fbcdf77f493" download>
                Test PDF
              </a>
            </li>
            <li>
              <a className="list-group-item" target="_blank" rel="noreferrer" href="https://firebasestorage.googleapis.com/v0/b/enschede-explorer-v3.appspot.com/o/Images%2FShocked%20Pikachu.png?alt=media&token=2259741f-569f-4732-8aad-dd399fa2af2b" download>
                Free Ram!
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default Documentation;
