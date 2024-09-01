import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaRobot } from "react-icons/fa"; // Importing icons from react-icons
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
  const [showChatbot, setShowChatbot] = useState(false); // State to control chatbot visibility

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

  useEffect(() => {
    if (showChatbot) {
      // Dynamically add the chatbot script to the DOM
      const script = document.createElement("script");
      script.src = "https://widget.cxgenie.ai/widget.js";
      script.setAttribute("data-aid", "87d4f4a8-376c-4b4e-9ee0-4531304009a2");
      script.setAttribute("data-lang", "en");
      script.async = true;
      script.onload = () => {
        console.log("Chatbot script loaded successfully.");
      };

      document.body.appendChild(script);

      // Clean up the script when component is unmounted or when showChatbot changes
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showChatbot]);

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

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot((prevState) => !prevState);
  };

  return (
    <motion.div
      style={{
        background: "linear-gradient(135deg, #000000, #C0C0C0)",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        position: "relative", // Needed for positioning the chatbot button
        overflow: "hidden", // Ensure that any animations stay within the bounds
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {role === "admin" && (
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              style={{
                background: "linear-gradient(135deg, #000000, #C0C0C0)",
                border: "none",
                color: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "box-shadow 0.3s ease-in-out",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaUserPlus />
              Add New Student
            </Button>
          </motion.div>
        )}

        <motion.h1
          className="text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ flexGrow: 1, textAlign: "center", color: "#ffffff" }}
          whileHover={{ scale: 1.02 }}
        >
          <i className="bi bi-speedometer" style={{ marginRight: "10px" }}></i>
          User Dashboard
        </motion.h1>

        <motion.div
          style={{ marginTop: "1rem" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaSearch />
            <SearchComponent
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={() => setSearchText(searchText)}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.01 }}
        style={{
          flex: 1,
          overflowY: "auto",
          backdropFilter: "blur(6px)",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.05)", // Slight transparency
        }}
      >
        <StudentList
          students={filteredStudents}
          role={role}
          onView={handleViewProfile}
          onDeleteStudent={role === "admin" ? handleStudentDelete : () => {}}
          onEditStudent={role === "admin" ? handleEditStudent : () => {}}
        />
      </motion.div>

      {role === "admin" && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <StudentForm
            show={showForm}
            handleClose={() => setShowForm(false)}
            studentData={newStudent}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </motion.div>
      )}

      {showProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <StudentProfile
            show={showProfile}
            handleClose={handleCloseProfile}
            student={selectedStudent}
          />
        </motion.div>
      )}

      {/* Chatbot Button */}
      <motion.div
        className="chatbot-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.7 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="dark"
          onClick={toggleChatbot}
          style={{
            background: "black",
            border: "none",
            color: "white",
            padding: "10px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FaRobot size={24} />
        </Button>
      </motion.div>

      {/* Chatbot Container */}
      {showChatbot && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            height: "400px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* This is where the chatbot iframe or widget will be displayed */}
          {/* For now, this can be a placeholder or a mock-up */}
          <h4 style={{ color: "white" }}>Chatbot</h4>
          <p style={{ color: "white" }}>
            Query Bot Is Getting Ready.Wait?
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
