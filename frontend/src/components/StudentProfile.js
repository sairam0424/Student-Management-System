import React, { useState, useEffect, useCallback } from "react";
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

// Framer Motion Variants
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

// Component Definition
const StudentProfile = React.memo(({ show, handleClose, student }) => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Function to toggle dark mode state, always defined regardless of render outcome
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  // Effect Hook - Optional: Check user's preference from localStorage or another source
  useEffect(() => {
    // Could implement a check for user preference here
  }, []);

  // Ensure the component is only rendered when student data is present
  if (!student) return null;

  // Dynamic styles based on dark mode state
  const cardStyle = darkMode ? "bg-dark text-white" : "bg-light text-dark";
  const headerStyle = darkMode
    ? "bg-gradient text-white"
    : "bg-gradient-light text-dark";
  const buttonVariant = darkMode ? "outline-light" : "outline-dark";

  return (
    <>
      {/* Helmet for SEO and Meta Information */}
      <Helmet>
        <title>{student.name}'s Profile | Your App Name</title>
        <meta name="description" content={`Profile of ${student.name}.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Modal with Motion for Animations */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className={`border-0 shadow ${cardStyle}`}>
            {/* Card Header with Gradient Background */}
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
                {/* Dark Mode Toggle Button */}
                <Button
                  variant={buttonVariant}
                  onClick={toggleDarkMode}
                  className="me-2"
                  aria-label={`Toggle to ${darkMode ? "light" : "dark"} mode`}
                >
                  {darkMode ? <SunFill /> : <MoonFill />}
                </Button>
                {/* Close Modal Button */}
                <Button variant={buttonVariant} onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Card.Header>

            {/* Card Body with Student Information */}
            <Card.Body>
              {/* Profile Image with Motion Effects */}
              <motion.div
                className="text-center mb-4"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={student.image}
                  alt={`Profile of ${student.name}`}
                  roundedCircle
                  style={{
                    width: "150px",
                    border: `3px solid ${darkMode ? "#6c757d" : "#007bff"}`,
                  }}
                />
              </motion.div>

              {/* Student Details with Motion Effects */}
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

            {/* Card Footer with Gradient Background */}
            <Card.Footer
              className={`text-center ${cardStyle}`}
              style={{
                background: "linear-gradient(135deg, #000000, #C0C0C0)", // Gradient footer
              }}
            ></Card.Footer>
          </Card>
        </motion.div>
      </Modal>
    </>
  );
});

export default StudentProfile;
