import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const StudentProfile = ({ show, handleClose, student }) => {
  if (!student) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{student.name}'s Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Image src={student.image} alt={student.name} roundedCircle style={{ width: '150px' }} />
        </div>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Marks:</strong> {student.marks}</p>
        <p><strong>Attendance:</strong> {student.attendance}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentProfile;
