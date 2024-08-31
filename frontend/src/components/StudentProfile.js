import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  PersonFill,
  EnvelopeFill,
  Hash,
  Percent,
  CardChecklist,
  SunFill,
  MoonFill,
} from "react-bootstrap-icons";

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};

const imageVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const detailVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const StudentProfile = ({ show, handleClose, student }) => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Optionally, you could check the user's preference from localStorage or another source
  }, []);

  if (!student) return null;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const cardStyle = darkMode
    ? "bg-dark text-white"
    : "bg-light text-dark";
  const headerStyle = darkMode
    ? "bg-gradient text-white"
    : "bg-gradient-light text-dark";
  const buttonVariant = darkMode ? "outline-light" : "outline-dark";
  const buttonHoverStyle = darkMode
    ? { backgroundColor: "#ffffff", color: "#000000" }
    : { backgroundColor: "#000000", color: "#ffffff" };

  return (
    <>
      <Helmet>
        <title>{student.name}'s Profile | Your App Name</title>
        <meta name="description" content={`Profile of ${student.name}.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className={`border-0 shadow ${cardStyle}`}>
            <Card.Header
              className={`d-flex align-items-center justify-content-between ${headerStyle}`}
              style={{
                background: "linear-gradient(135deg, #000000, #C0C0C0)", // Gradient header
              }}
            >
              <motion.h5
                className="mb-0"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {student.name}'s Profile
              </motion.h5>
              <div>
                <Button
                  variant={buttonVariant}
                  onClick={toggleDarkMode}
                  className="me-2"
                >
                  {darkMode ? <SunFill /> : <MoonFill />}
                </Button>
                <Button variant={buttonVariant} onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <motion.div
                className="text-center mb-4"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={student.image}
                  alt={student.name}
                  roundedCircle
                  style={{
                    width: "150px",
                    border: `3px solid ${darkMode ? "#6c757d" : "#007bff"}`,
                  }}
                />
              </motion.div>
              <motion.div
                variants={detailVariants}
                initial="hidden"
                animate="visible"
              >
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <PersonFill className="me-2" />
                      <strong>Name:</strong> {student.name}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <Hash className="me-2" />
                      <strong>Age:</strong> {student.age}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <EnvelopeFill className="me-2" />
                      <strong>Email:</strong> {student.email}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <CardChecklist className="me-2" />
                      <strong>Marks:</strong> {student.marks}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <Percent className="me-2" />
                      <strong>Attendance:</strong> {student.attendance}%
                    </p>
                  </Col>
                </Row>
              </motion.div>
            </Card.Body>
            <Card.Footer
              className={`text-center ${cardStyle}`}
              style={{
                background: "linear-gradient(135deg, #000000, #C0C0C0)", // Gradient footer
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, ...buttonHoverStyle }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={darkMode ? "light" : "primary"}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </motion.div>
            </Card.Footer>
          </Card>
        </motion.div>
      </Modal>
    </>
  );
};

export default StudentProfile;
