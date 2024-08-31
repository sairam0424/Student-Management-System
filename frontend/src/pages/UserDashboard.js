import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import StudentList from "./StudentList";
import SearchComponent from "../components/SearchComponents";
import { useStudentManagement } from "../customHooks/useStudentManagement";
import StudentForm from "../components/StudentForm";
import StudentProfile from "../components/StudentProfile";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../gqlopertions/mutations";

const UserDashboard = () => {
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
    showForm,
    setShowForm,
    isEditing,
    newStudent,
    handleStudentDelete,
    handleEditStudent,
    handleInputChange,
    handleSubmit,
  } = useStudentManagement();

  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const { data, loading, error } = useQuery(GET_STUDENTS);
  const role = localStorage.getItem("role");

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

  useEffect(() => {
    if (data) {
      setFilteredStudents(data.students);
    }
  }, [data]);

  if (studentsLoading || loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (studentsError || error)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          Error: {studentsError?.message || error?.message}
        </Alert>
      </Container>
    );

  const handleViewProfile = (studentId) => {
    const student = filteredStudents.find(
      (student) => student._id === studentId
    );
    setSelectedStudent(student);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedStudent(null);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #000000, #C0C0C0)',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        {role === "admin" && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              style={{
                background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                border: 'none',
                color: '#ffffff',
              }}
            >
              Add New Student
            </Button>
          </motion.div>
        )}

        <motion.h1
          className="text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ flexGrow: 1, textAlign: 'center', color: '#ffffff' }}  // Updated color to white
        >
          User Dashboard
        </motion.h1>

        <div style={{ marginTop: '1rem' }}>
          <SearchComponent
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={() => setSearchText(searchText)}
          />
        </div>
      </div>

      <StudentList
        students={filteredStudents}
        role={role}
        onView={handleViewProfile}
        onDeleteStudent={role === "admin" ? handleStudentDelete : () => {}}
        onEditStudent={role === "admin" ? handleEditStudent : () => {}}
      />

      {role === "admin" && (
        <StudentForm
          show={showForm}
          handleClose={() => setShowForm(false)}
          studentData={newStudent}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}

      {showProfile && (
        <StudentProfile
          show={showProfile}
          handleClose={handleCloseProfile}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default UserDashboard;
