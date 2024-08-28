// components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import StudentList from './StudentList'; // Reuse the StudentList component from AdminDashboard
import SearchComponent from '../components/SearchComponents';
import { useStudentManagement } from '../customHooks/useStudentManagement';
import StudentForm from '../components/StudentForm'; // Import StudentForm if needed

const UserDashboard = ({ role }) => {
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

  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Effect to filter students based on search text
  useEffect(() => {
    if (searchText === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, students]);

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

  // Handle add student action for admin
  const handleAddStudent = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">User Dashboard</h1>
      
      {/* For admins, show the "Add New Student" button */}
      {role === 'admin' && (
        <div className="text-center mb-4">
          <Button variant="primary" onClick={handleAddStudent}>
            Add New Student
          </Button>
        </div>
      )}

      {/* Search Component */}
      <SearchComponent 
        searchText={searchText} 
        setSearchText={setSearchText} 
        onSearch={() => setSearchText(searchText)} 
      />

      {/* Pass a prop to indicate whether the user can edit/delete */}
      <StudentList
        students={filteredStudents}
        role={role}
        onDeleteStudent={role === 'admin' ? handleStudentDelete : () => {}} 
        onEditStudent={role === 'admin' ? handleEditStudent : () => {}}  
      />

      {/* Conditionally render StudentForm based on showForm state */}
      {role === 'admin' && (
        <StudentForm
          show={showForm}
          handleClose={() => setShowForm(false)}
          studentData={newStudent}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default UserDashboard;
