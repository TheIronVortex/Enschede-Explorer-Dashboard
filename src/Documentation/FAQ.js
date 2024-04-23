import { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

function FAQ({ Question, Answer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th className="h3">
                <Button className="me-3" onClick={toggleExpand}>
                  {isExpanded ? "▲" : "▼"}
                </Button>
                Q: {Question}
              </th>
            </tr>
          </thead>
          {isExpanded && (
            <tbody>
              <tr>
                <td>A: <span dangerouslySetInnerHTML={{ __html: Answer }} /></td>
              </tr>
            </tbody>
          )}
        </Table>
      </Col>
    </Row>
  );
}

export default FAQ;
