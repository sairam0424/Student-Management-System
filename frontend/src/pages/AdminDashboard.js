// components/AdminDashboard.js
import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import StudentList from './StudentList';
import StudentForm from '../components/StudentForm';
import { useStudentManagement } from '../customHooks/useStudentManagement';
import { useLocation } from 'react-router-dom';
function AdminDashboard() {
  const {
    students,
    loading,
    error,
    showForm,
    setShowForm,
    isEditing,
    newStudent,
    handleStudentDelete,
    handleEditStudent,
    handleInputChange,
    handleSubmit
  } = useStudentManagement();

  const location = useLocation();

  const {role} = location.state || {}

  // console.log("admin Dashboard",role)



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
              <Button variant="primary" className="w-100 mb-2" onClick={() => { setShowForm(true); }}>
                Add New Student
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <StudentList role={role} students={students} onDeleteStudent={handleStudentDelete} onEditStudent={handleEditStudent} />
        </Col>
      </Row>
      <StudentForm 
        show={showForm} 
        handleClose={() => setShowForm(false)} 
        role="admin"
        studentData={newStudent} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        isEditing={isEditing}
      />
    </Container>
  );
}

export default AdminDashboard;
