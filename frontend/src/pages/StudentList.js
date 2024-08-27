import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_STUDENT } from '../gqlopertions/mutations';

function StudentList({ students, onDeleteStudent }) {
  const [deleteStudent] = useMutation(DELETE_STUDENT);

  const handleDelete = async (_id) => {
    try {
      await deleteStudent({ variables: { _id: _id } });
      onDeleteStudent(_id); // Call the function passed from parent to update the list
    //   alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
    //   alert('Failed to delete student');
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Attendance</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.marks}</td>
              <td>{student.attendance}</td>
              <td><img src={student.image} alt={student.name} style={{ width: '50px' }} /></td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
                {/* Implement update functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
