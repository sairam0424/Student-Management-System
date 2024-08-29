import React from 'react';
import { Placeholder, Card, Row, Col, Container, Button } from 'react-bootstrap';

const Shimmer = () => {
  return (
    <Container className="mt-5">
      {/* Shimmer for the Header */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Subtitle} animation="glow" className="mb-3">
                <Placeholder xs={4} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} className="w-100" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Shimmer for the Search Component */}
      <Row className="mb-4">
        <Col>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Col>
      </Row>

      {/* Shimmer for the Student List */}
      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Placeholder as="div" animation="glow">
                {/* Representing multiple rows of student entries */}
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="mb-2">
                    <Placeholder xs={8} className="mb-2" />
                    <Placeholder xs={10} />
                    <Placeholder xs={9} />
                  </div>
                ))}
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Placeholder Rows for more content, if needed */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as="div" animation="glow">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="mb-2">
                    <Placeholder xs={8} className="mb-2" />
                    <Placeholder xs={10} />
                    <Placeholder xs={9} />
                  </div>
                ))}
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Shimmer;
