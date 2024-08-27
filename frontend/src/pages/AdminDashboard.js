import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STUDENTS, CREATE_STUDENT } from '../gqlopertions/mutations';
import StudentList from './StudentList';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';

function AdminDashboard() {
  const { data, loading, error } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    email: '',
    marks: '',
    attendance: '',
    image: ''
  });

  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);

  const handleStudentDelete = (id) => {
    setStudents(students.filter(student => student._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createStudent({ variables: { studentNew: newStudent } });
      setStudents([...students, data.addStudent]);
      setShowForm(false); // Hide the form after successful submission
      setNewStudent({
        name: '',
        age: '',
        email: '',
        marks: '',
        attendance: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (error) return (
    <Container className="text-center mt-5">
      <Alert variant="danger">
        Error: {error.message}
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Admin Dashboard</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">Total Students: {students.length}</Card.Subtitle>
              <Button variant="primary" className="w-100" onClick={() => setShowForm(true)}>Add New Student</Button>
              <Button variant="secondary" className="w-100 mt-2">Update Student</Button>
              <Button variant="danger" className="w-100 mt-2">Delete Student</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <StudentList students={students} onDeleteStudent={handleStudentDelete} />
        </Col>
      </Row>

      {/* Add New Student Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter student name" 
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter student age" 
                value={newStudent.age}
                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter student email" 
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group controlId="formMarks">
              <Form.Label>Marks</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter student marks" 
                value={newStudent.marks}
                onChange={(e) => setNewStudent({ ...newStudent, marks: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group controlId="formAttendance">
              <Form.Label>Attendance</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter student attendance" 
                value={newStudent.attendance}
                onChange={(e) => setNewStudent({ ...newStudent, attendance: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter student image URL" 
                value={newStudent.image}
                onChange={(e) => setNewStudent({ ...newStudent, image: e.target.value })}
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
