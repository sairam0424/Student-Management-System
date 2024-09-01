import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useStudentManagement } from "../customHooks/useStudentManagement";
import debounce from "lodash/debounce";

// Lazy loading components
const StudentList = React.lazy(() => {
  console.log("Loading StudentList component lazily...");
  return import("./StudentList");
});
const StudentForm = React.lazy(() => {
  console.log("Loading StudentForm component lazily...");
  return import("../components/StudentForm");
});
const SearchComponent = React.lazy(() => {
  console.log("Loading SearchComponent component lazily...");
  return import("../components/SearchComponents");
});

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
    fetchMoreStudents, // Ensure this function is properly defined and imported
  } = useStudentManagement();

  const role = localStorage.getItem("role");

  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const containerRef = useRef(null); // Ref for infinite scroll

  // Debounce the search input to optimize performance
  const debouncedSearch = useCallback(
    debounce((text) => setSearchText(text), 300),
    []
  );

  useEffect(() => {
    // Filter students based on search text
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
    // Infinite scroll logic
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight - scrollTop === clientHeight) {
          // Check if fetchMoreStudents is a function before calling
          if (typeof fetchMoreStudents === "function") {
            console.log("Reached bottom, fetching more students...");
            setCurrentPage((prevPage) => prevPage + 1);
            fetchMoreStudents(currentPage); // Fetch the next set of students
          } else {
            console.warn("fetchMoreStudents is not a function.");
          }
        }
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPage, fetchMoreStudents]);

  if (loading)
    return (
      <Container
        className="text-center mt-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000, #C0C0C0)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000, #C0C0C0)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Your App Name</title>
        <meta
          name="description"
          content="Admin Dashboard for managing students in Your App Name."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Admin Dashboard | Your App Name" />
        <meta
          property="og:description"
          content="Admin Dashboard for managing students in Your App Name."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourappname.com/admindashboard"
        />
      </Helmet>
      <Container
        ref={containerRef}
        className="mt-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000, #C0C0C0)",
          color: "#ffffff",
          padding: "2rem",
          position: "relative",
          overflowY: "auto",
          maxHeight: "80vh", // Limit height to trigger scrolling
        }}
      >
        {/* Header Row */}
        <Row className="mb-4 align-items-center">
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-start"
          >
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
                    background: "linear-gradient(135deg, #000000, #C0C0C0)",
                    border: "none",
                    color: "#ffffff",
                  }}
                  as={motion.button}
                  whileHover={{
                    background: "linear-gradient(135deg, #ffffff, #000000)",
                    color: "#000000",
                  }}
                  whileTap={{
                    background: "linear-gradient(135deg, #000000, #C0C0C0)",
                    color: "#ffffff",
                  }}
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
              style={{ flexGrow: 1, color: "#ffffff" }}
            >
              Admin Dashboard
            </motion.h1>
          </Col>

          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-end"
          >
            {/* Search Bar */}
            <div style={{ marginTop: "15px" }}>
              <React.Suspense fallback={<Spinner animation="border" />}>
                <SearchComponent
                  searchText={searchText}
                  setSearchText={debouncedSearch}
                  onSearch={() => debouncedSearch(searchText)}
                />
              </React.Suspense>
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
              <React.Suspense fallback={<Spinner animation="border" />}>
                <StudentList
                  role={role}
                  students={filteredStudents}
                  onDeleteStudent={handleStudentDelete}
                  onEditStudent={handleEditStudent}
                />
              </React.Suspense>
            </motion.div>
          </Col>
        </Row>

        {/* Student Form */}
        <React.Suspense fallback={<Spinner animation="border" />}>
          <StudentForm
            show={showForm}
            handleClose={() => setShowForm(false)}
            role={role}
            studentData={newStudent}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </React.Suspense>
      </Container>
    </>
  );
}

export default AdminDashboard;
