import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import StudentList from "./StudentList";
import StudentForm from "../components/StudentForm";
import SearchComponent from "../components/SearchComponents";
import { useStudentManagement } from "../customHooks/useStudentManagement";
import { motion } from "framer-motion";

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
    handleSubmit,
  } = useStudentManagement();

  const role = localStorage.getItem("role");

  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (searchText === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, students]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (error)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center mb-4">
                  Admin Dashboard
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted text-center">
                  Total Students: {students.length}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  className="mb-2 w-35"
                  onClick={() => setShowForm(true)}
                >
                  Add New Student
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Search Component */}
      <Row className="mb-4">
        <Col>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SearchComponent
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={() => setSearchText(searchText)}
            />
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StudentList
              role={role}
              students={filteredStudents}
              onDeleteStudent={handleStudentDelete}
              onEditStudent={handleEditStudent}
            />
          </motion.div>
        </Col>
      </Row>

      <StudentForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        role={role}
        studentData={newStudent}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </Container>
  );
}

export default AdminDashboard;
