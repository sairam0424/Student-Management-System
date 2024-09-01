/* This code snippet is defining GraphQL operations using the `gql` tag from the Apollo Client library.
Here's a breakdown of what each operation is doing: */
import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signinUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
      role
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation AddStudent($studentNew: StudentInput!) {
    addStudent(studentNew: $studentNew) {
      _id
      name
      age
      email
      marks
      attendance
      image
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($_id: ID!, $studentUpdate: StudentUpdateInput!) {
    updateStudent(_id: $_id, studentUpdate: $studentUpdate) {
      _id
      name
      age
      email
      marks
      attendance
      image
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($_id: ID!) {
    deleteStudent(_id: $_id)
  }
`;

export const GET_STUDENTS = gql`
  query getStudents {
    students {
      _id
      name
      age
      email
      marks
      attendance
      image
    }
  }
`;
