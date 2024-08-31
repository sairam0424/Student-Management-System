import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
} from "../gqlopertions/mutations";

export const useStudentManagement = () => {
  const { data, loading, error } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    marks: "",
    attendance: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);

  const handleStudentDelete = (id) => {
    setStudents(students.filter((student) => student._id !== id));
  };

  const handleEditStudent = (student) => {
    setIsEditing(true);
    setCurrentStudentId(student._id);
    setNewStudent({
      name: student.name,
      age: student.age,
      email: student.email,
      marks: student.marks,
      attendance: student.attendance,
      image: student.image,
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: ["age", "marks", "attendance"].includes(name) ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        ...newStudent,
        age: parseInt(newStudent.age, 10),
        marks: parseFloat(newStudent.marks),
        attendance: parseFloat(newStudent.attendance),
      };

      if (isEditing) {
        const { data } = await updateStudent({
          variables: { _id: currentStudentId, studentUpdate: studentData },
        });
        setStudents(
          students.map((student) =>
            student._id === currentStudentId ? data.updateStudent : student
          )
        );
        setIsEditing(false);
        setCurrentStudentId(null);
      } else {
        const { data } = await createStudent({
          variables: { studentNew: studentData },
        });
        setStudents([...students, data.addStudent]);
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding/updating student:", error);
    }
  };

  const resetForm = () => {
    setNewStudent({
      name: "",
      age: "",
      email: "",
      marks: "",
      attendance: "",
      image: "",
    });
  };

  return {
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
  };
};
