import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../gqlopertions/mutations";
import { Card, Button, Table, Image } from "react-bootstrap";

function StudentList({ students, onView, onDeleteStudent, onEditStudent }) {
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const role = localStorage.getItem("role");

  const handleDelete = async (_id) => {
    try {
      await deleteStudent({ variables: { _id: _id } });
      onDeleteStudent(_id);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Student List</Card.Title>
        <Table striped bordered hover responsive className="text-center">
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
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{student.marks}</td>
                <td>{student.attendance}</td>
                <td>
                  <Image
                    src={student.image}
                    alt={student.name}
                    style={{ width: "50px" }}
                    roundedCircle
                  />
                </td>
                <td>
                  {role === "admin" ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onEditStudent(student)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => onView(student._id)}
                    >
                      View
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default StudentList;
