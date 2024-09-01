  import React, { useState, useEffect } from "react";
  import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
  import StudentList from "./StudentList";
  import StudentForm from "../components/StudentForm";
  import SearchComponent from "../components/SearchComponents";
  import { useStudentManagement } from "../customHooks/useStudentManagement";
  import { motion } from "framer-motion";
  import { Helmet } from "react-helmet";

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
        <Container
          className="text-center mt-5"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner animation="border" variant="light" />
        </Container>
      );

    if (error)
      return (
        <Container
          className="text-center mt-5"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Alert variant="danger">Error: {error.message}</Alert>
        </Container>
      );

    return (
      <>
        <Helmet>
          <title>Admin Dashboard | Your App Name</title>
          <meta name="description" content="Admin Dashboard for managing students in Your App Name." />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Admin Dashboard | Your App Name" />
          <meta property="og:description" content="Admin Dashboard for managing students in Your App Name." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourappname.com/admindashboard" />
        </Helmet>
        <Container
          className="mt-5"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
            color: '#ffffff',
            padding: '2rem',
            position: 'relative',
          }}
        >
          {/* Header Row */}
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={4} className="d-flex align-items-center justify-content-start">
              {/* Add New Student Button */}
              {role === "admin" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="me-3"
                >
                  <Button
                    variant="light"
                    onClick={() => setShowForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                      border: 'none',
                      color: '#ffffff'
                    }}
                    as={motion.button}
                    whileHover={{ background: 'linear-gradient(135deg, #ffffff, #000000)', color: '#000000' }}
                    whileTap={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', color: '#ffffff' }}
                  >
                    Add New Student
                  </Button>
                </motion.div>
              )}
            </Col>

            <Col xs={12} md={4} className="text-center">
              {/* Dashboard Title */}
              <motion.h1
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ flexGrow: 1, color: '#ffffff' }}
              >
                Admin Dashboard
              </motion.h1>
            </Col>

            <Col xs={12} md={4} className="d-flex align-items-center justify-content-end">
              {/* Search Bar */}
              <div style={{ marginTop: '15px' }}>
                <SearchComponent
                  searchText={searchText}
                  setSearchText={setSearchText}
                  onSearch={() => setSearchText(searchText)}
                />
              </div>
            </Col>
          </Row>

          {/* Student List */}
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

          {/* Student Form */}
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
      </>
    );
  }

  export default AdminDashboard;
