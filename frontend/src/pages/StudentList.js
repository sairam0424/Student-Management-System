import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../gqlopertions/mutations";
import { Button, Image, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';

function StudentList({ students, onView, onDeleteStudent, onEditStudent }) {
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const role = localStorage.getItem("role");

  const handleDelete = async (_id) => {
    try {
      await deleteStudent({ variables: { _id } });
      onDeleteStudent(_id);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Student List | Your App Name</title>
        <meta
          name="description"
          content="View and manage the list of students in the Admin Dashboard."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Student List | Your App Name" />
        <meta
          property="og:description"
          content="View and manage the list of students in the Admin Dashboard."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourappname.com/students" />
      </Helmet>
      <div
        style={{
          background: 'linear-gradient(135deg, #000000, #C0C0C0)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row xs={1} sm={2} md={3} lg={3} className="g-4">
            {students.map((student) => (
              <Col key={student._id}>
                <motion.div
                  className="d-flex flex-column align-items-center mb-4"
                  style={{
                    background: '#000',
                    color: '#fff',
                    borderRadius: '15px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    border: '1px solid #C0C0C0',
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}
                >
                  <motion.div
                    style={{
                      width: '120px',
                      height: '120px',
                      overflow: 'hidden',
                      borderRadius: '50%',
                      marginBottom: '15px',
                      border: '4px solid #C0C0C0',
                    }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Image
                      src={student.image}
                      alt={student.name}
                      fluid
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '50%',
                      }}
                    />
                  </motion.div>
                  <h5>{student.name}</h5>
                  <p>Age: {student.age}</p>
                  <p>Email: {student.email}</p>
                  <p>Marks: {student.marks}</p>
                  <p>Attendance: {student.attendance}</p>
                  <div className="d-flex mt-3">
                    {role === "admin" ? (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => onEditStudent(student)}
                          style={{
                            color: '#ffffff',
                            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                            border: 'none',
                            marginRight: '10px',
                          }}
                          as={motion.button}
                          whileHover={{ background: 'linear-gradient(135deg, #ffffff, #000000)', color: '#000000' }}
                          whileTap={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', color: '#ffffff' }}
                        >
                          <PencilSquare />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleDelete(student._id)}
                          style={{
                            color: '#ffffff',
                            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                            border: 'none',
                          }}
                          as={motion.button}
                          whileHover={{ background: 'linear-gradient(135deg, #ffffff, #000000)', color: '#000000' }}
                          whileTap={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', color: '#ffffff' }}
                        >
                          <Trash />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => onView(student._id)}
                        style={{
                          color: '#ffffff',
                          background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                          border: 'none',
                        }}
                        as={motion.button}
                        whileHover={{ background: 'linear-gradient(135deg, #ffffff, #000000)', color: '#000000' }}
                        whileTap={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', color: '#ffffff' }}
                      >
                        <Eye />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </>
  );
}

export default StudentList;
