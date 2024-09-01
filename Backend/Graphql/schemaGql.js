/* This code snippet is defining the GraphQL schema using Apollo Server's `gql` tag for defining type
definitions. Here's a breakdown of what the code is doing: */
import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    students: [Student]
    student(_id: ID!): Student
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
  }

  type Student {
    _id: ID!
    name: String!
    age: Int!
    email: String!
    marks: Float!
    attendance: Float!
    image: String
  }

  type Token {
    token: String
    role: String
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    addStudent(studentNew: StudentInput!): Student
    updateStudent(_id: ID!, studentUpdate: StudentUpdateInput!): Student
    deleteStudent(_id: ID!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  input StudentInput {
    name: String!
    age: Int!
    email: String!
    marks: Float!
    attendance: Float!
    image: String
  }

  input StudentUpdateInput {
    name: String!
    age: Int!
    email: String!
    marks: Float!
    attendance: Float!
    image: String!
  }
`;

export default typeDefs;
