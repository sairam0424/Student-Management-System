import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT } from '../gqlopertions/mutations';
import StudentList from './StudentList';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';

function AdminDashboard() {
  const { data, loading, error } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
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

  const handleEditStudent = (student) => {
    setIsEditing(true);
    setCurrentStudentId(student._id);
    setNewStudent({
      name: student.name,
      age: student.age,
      email: student.email,
      marks: student.marks,
      attendance: student.attendance,
      image: student.image
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        ...newStudent,
        age: parseInt(newStudent.age, 10),
        marks: parseFloat(newStudent.marks),
        attendance: parseFloat(newStudent.attendance)
      };

      if (isEditing) {
        // Perform update mutation with the correct input type
        const { data } = await updateStudent({
          variables: { _id: currentStudentId, studentUpdate: studentData }
        });
        setStudents(students.map(student => student._id === currentStudentId ? data.updateStudent : student));
        setIsEditing(false);
        setCurrentStudentId(null);
      } else {
        // Perform create mutation
        const { data } = await createStudent({ variables: { studentNew: studentData } });
        setStudents([...students, data.addStudent]);
      }

      setShowForm(false);
      setNewStudent({
        name: '',
        age: '',
        email: '',
        marks: '',
        attendance: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding/updating student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: ['age', 'marks', 'attendance'].includes(name) ? value : value
    }));
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
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Admin Dashboard</Card.Title>
              <Card.Subtitle className="mb-3 text-muted text-center">Total Students: {students.length}</Card.Subtitle>
              <Button variant="primary" className="w-100 mb-2" onClick={() => {setShowForm(true); setIsEditing(false);}}>Add New Student</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <StudentList students={students} onDeleteStudent={handleStudentDelete} onEditStudent={handleEditStudent} />
        </Col>
      </Row>

      {/* Add/Update Student Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
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
                value={newStudent.name}
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
                value={newStudent.age}
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
                value={newStudent.email}
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
                value={newStudent.marks}
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
                value={newStudent.attendance}
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
                value={newStudent.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isEditing ? 'Update Student' : 'Add Student'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
