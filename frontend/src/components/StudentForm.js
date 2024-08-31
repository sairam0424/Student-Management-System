import React from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  PersonFill,
  EnvelopeFill,
  ImageFill,
  Hash,
  Percent,
} from "react-bootstrap-icons";

function StudentForm({
  show,
  handleClose,
  studentData,
  handleInputChange,
  handleSubmit,
  isEditing,
}) {
  return (
    <>
      <Helmet>
        <title>{isEditing ? "Edit Student" : "Add New Student"} | Your App Name</title>
        <meta name="description" content={`Form to ${isEditing ? "update" : "add"} student information.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Update Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: '#000000', // Black background
            color: '#ffffff', // White text
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <PersonFill />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter student name"
                  name="name"
                  value={studentData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAge" className="mb-3">
              <Form.Label>Age</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <Hash />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter student age"
                  name="age"
                  value={studentData.age}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <EnvelopeFill />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter student email"
                  name="email"
                  value={studentData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formMarks" className="mb-3">
              <Form.Label>Marks</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <Hash />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter student marks"
                  name="marks"
                  value={studentData.marks}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAttendance" className="mb-3">
              <Form.Label>Attendance</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <Percent />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter attendance percentage"
                  name="attendance"
                  value={studentData.attendance}
                  onChange={handleInputChange}
                  required
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <ImageFill />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                  value={studentData.image}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: '#1a1a1a', // Darker black background for input
                    color: '#ffffff', // White text
                    borderColor: '#444444', // Dark border
                  }}
                />
              </InputGroup>
            </Form.Group>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#333333',
                transition: { duration: 0.3 },
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: '#555555',
                transition: { duration: 0.3 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ textAlign: 'center' }} // Centering the button text
            >
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: '#000000', // Black background
                  borderColor: '#444444', // Dark border
                  color: '#ffffff', // White text
                  border: 'none',
                  fontSize: '16px',
                }}
              >
                {isEditing ? "Update Student" : "Add Student"}
              </Button>
            </motion.div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentForm;
