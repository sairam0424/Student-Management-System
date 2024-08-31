import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaInfoCircle, FaList } from "react-icons/fa";

function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const handleToggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleToggleFeatures = () => {
    setShowFeatures((prev) => !prev);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center shadow-lg border-0 mb-4 bg-light">
              <Card.Header
                as="h4"
                className="bg-primary text-white p-3 rounded-top"
              >
                Home Dashboard for Student Management System
              </Card.Header>
              <Card.Body className="p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Carousel className="mb-4" interval={2000} pause="hover">
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3DA"
                        alt="Welcome to Student Management System"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                      <Carousel.Caption>
                        <motion.h3
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Welcome to the Student Management System
                        </motion.h3>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Manage your students, track their progress, and more.
                        </motion.p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3Dhttps://via.placeholder.com/800x300?text=Manage+Students"
                        alt="Manage Students"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                      <Carousel.Caption>
                        <motion.h3
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Manage Students Easily
                        </motion.h3>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Add, update, and remove student records with ease.
                        </motion.p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 rounded"
                        src="https://images.unsplash.com/photo-1596629095299-544ddf11b6f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGNvbXBhbnl8ZW58MHx8MHx8fDA%3D"
                        alt="View Reports"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                      <Carousel.Caption>
                        <motion.h3
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Enhanced Profile View
                        </motion.h3>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          Get detailed insights into student performance.
                        </motion.p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </motion.div>

                <Card.Text className="mb-4">
                  Welcome to the Student Management System (SMS). This provides
                  quick access to all essential features and functionalities to
                  efficiently manage student data.
                </Card.Text>

                <Row className="justify-content-center mb-4">
                  <Col xs={12} md={8}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline-primary"
                        className="w-100 d-flex align-items-center justify-content-center"
                        onClick={handleToggleFeatures}
                      >
                        <FaList className="me-2" />{" "}
                        {showFeatures ? "Hide Features" : "Show Features"}
                      </Button>
                    </motion.div>
                  </Col>
                </Row>

                {showFeatures && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <Row className="justify-content-center g-4">
                      {[
                        {
                          title: "Enhanced Student Profiles",
                          description: "Detailed profiles for each student.",
                        },
                        {
                          title: "Different Dashboards",
                          description:
                            "Multiple dashboards for different user roles.",
                        },
                        {
                          title: "ChatBot Integration",
                          description:
                            "AI-powered chatbot for instant student queries.",
                        },
                        {
                          title: "Search Students",
                          description:
                            "Search and filter students by name or category.",
                        },
                        {
                          title: "Rich Profile View",
                          description:
                            "Comprehensive view of student profiles.",
                        },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          className="col-xs-12 col-md-6 col-lg-4"
                        >
                          <Card className="shadow-lg border-0 h-100 bg-light">
                            <Card.Body>
                              <Card.Title>{feature.title}</Card.Title>
                              <Card.Text>{feature.description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      ))}
                    </Row>
                  </motion.div>
                )}

                <Row className="justify-content-center mt-4">
                  <Col xs={12} md={8}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline-primary"
                        className="w-100 d-flex align-items-center justify-content-center"
                        onClick={handleToggleInfo}
                      >
                        <FaInfoCircle className="me-2" />{" "}
                        {showInfo
                          ? "Hide Information"
                          : "Show More Information"}
                      </Button>
                    </motion.div>
                  </Col>
                </Row>

                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <Card className="border-0 shadow-lg bg-light">
                      <Card.Body>
                        <Card.Title>Additional Information</Card.Title>
                        <Card.Text>
                          Our Student Management System (SMS) is designed to
                          offer a comprehensive solution for educational
                          institutions, streamlining the management of student
                          data and enhancing administrative efficiency. With an
                          intuitive interface and robust features, SMS
                          simplifies the complex processes involved in student
                          management.
                        </Card.Text>
                        <Button variant="primary" onClick={handleToggleInfo}>
                          Close
                        </Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                )}
              </Card.Body>
              <Card.Footer className="text-muted bg-light">
                © 2024 Student Management System
              </Card.Footer>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
