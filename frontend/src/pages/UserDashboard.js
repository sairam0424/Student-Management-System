import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import StudentList from './StudentList';
import SearchComponent from '../components/SearchComponents';
import { useStudentManagement } from '../customHooks/useStudentManagement';
import StudentForm from '../components/StudentForm';
import StudentProfile from '../components/StudentProfile'; 
import { useQuery } from '@apollo/client';
import { GET_STUDENTS } from '../gqlopertions/mutations';

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
    handleSubmit
  } = useStudentManagement();

  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const { data, loading, error } = useQuery(GET_STUDENTS);
  const role = localStorage.getItem("role")
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

  useEffect(() => {
    if (data) {
      setFilteredStudents(data.students);
    }
  }, [data]);

  if (studentsLoading || loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (studentsError || error) return (
    <Container className="text-center mt-5">
      <Alert variant="danger">
        Error: {studentsError?.message || error?.message}
      </Alert>
    </Container>
  );

  const handleViewProfile = (studentId) => {
    const student = filteredStudents.find(student => student._id === studentId);
    setSelectedStudent(student);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">User Dashboard</h1>
      
      <div className="text-center mb-4">
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Add New Student
        </Button>
      </div>

      <SearchComponent 
        searchText={searchText} 
        setSearchText={setSearchText} 
        onSearch={() => setSearchText(searchText)} 
      />

      <StudentList
        students={filteredStudents}
        role={role}
        onView={handleViewProfile}
        onDeleteStudent={role === 'admin' ? handleStudentDelete : () => {}} 
        onEditStudent={role === 'admin' ? handleEditStudent : () => {}}  
      />

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

      {showProfile && (
        <StudentProfile
          show={showProfile}
          handleClose={handleCloseProfile}
          student={selectedStudent}
        />
      )}
    </div>
  );
}

export default UserDashboard;
