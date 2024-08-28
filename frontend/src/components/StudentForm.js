// components/StudentForm.js
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function StudentForm({ show, handleClose, studentData, handleInputChange, handleSubmit, isEditing }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Update Student' : 'Add New Student'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter student name" 
              name="name"
              value={studentData.name}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter student age" 
              name="age"
              value={studentData.age}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter student email" 
              name="email"
              value={studentData.email}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formMarks" className="mb-3">
            <Form.Label>Marks</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter student marks" 
              name="marks"
              value={studentData.marks}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formAttendance" className="mb-3">
            <Form.Label>Attendance</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter attendance percentage" 
              name="attendance"
              value={studentData.attendance}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter image URL" 
              name="image"
              value={studentData.image}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            {isEditing ? 'Update Student' : 'Add Student'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default StudentForm;
