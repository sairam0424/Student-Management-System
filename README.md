# Student Management System

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [GraphQL Schema](#graphql-schema)
- [Project Dependencies](#project-dependencies)
- [Testing and Quality Assurance](#testing-and-quality-assurance)
- [Deployment](#deployment)
- [License](#license)

## Introduction

The Student Management System (SMS) is an advanced solution designed to manage various aspects of student data and activities within a college or educational institution. It provides tools for managing student records, tracking academic progress, and facilitating communication between students and the administration.

## Project Overview

### Primary Features of the Student Management System (SMS):

- User authentication and authorization with specific role-based interfaces.
- Student Data Management: Add, update, delete, and view student records.
- Task management for student-related activities.
- Reporting and Analytics for academic performance.
- Query Bot Integration for student inquiries.

## System Architecture

The Student Management System uses a microservice architecture with separate components for the backend and web frontend.

### Backend:
- **Technologies:** Node.js, Express.js, MongoDB, GraphQL
- **Description:** Provides RESTful and GraphQL APIs for managing student data and user authentication.

### Web Frontend:
- **Technologies:** React, Redux, Tailwind CSS, React-Bootstrap, GraphQL,React-Icons
- **Description:** The frontend is a single-page application built with React, featuring a responsive and user-friendly interface.

## Technology Stack

### Frontend (Web)
- React
- Redux
- Tailwind CSS
- Bootstrap
- Framer Motion
- GraphQL

### Backend
- Node.js
- Express.js
- MongoDB
- GraphQL
- Apollo Server

### Testing
- Jest
- Mocha
- Chai
- Karma

### Deployment
- AWS / Vercel / Netlify / Heroku

## Features

- **User Authentication:** Secure login/signup using JWT.
- **Role-Based Access Control:** Different views and functionalities for admins and students.
- **Student Management:** CRUD operations for managing student profiles.
- **Search and Filter:** Search students by name, email, or other attributes.
- **Analytics and Reporting:** Visual reports using chart libraries like Chart.js.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **SEO Optimization:** Improved SEO using React Helmet.
- **Animations:** Smooth UI animations using Framer Motion.

## Setup and Installation

To run this application locally, follow the steps below:

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sairam0424/Student-Management-System.git

2:Navigate to the backend directory:
```bash
cd student-management-system/backend
```
3:Install the dependencies:
```bash
npm install
```

4:Set up environment variables:

Create a .env file in the root of the backend directory and add your environment variables as shown in the .env.example.

5:Start the backend server:

```bash
npm start
```

Frontend Setup
Navigate to the frontend directory:

```bash
cd ../frontend
```
Install the dependencies:

```bash
npm install
```
Start the frontend server:

```bash
npm start
```
Open your browser and navigate to http://localhost:3000.


#GraphQL Schema
The GraphQL schema defines the structure of the API and is implemented using Apollo Server. Below is a brief overview of the schema:

```bash
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
  marks: Int
  attendance: Float
  image: String
}

type Mutation {
  signupUser(userNew: UserInput!): User
  signinUser(userSignin: UserSigninInput!): AuthPayload
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
  marks: Int
  attendance: Float
  image: String
}

input StudentUpdateInput {
  name: String
  age: Int
  email: String
  marks: Int
  attendance: Float
  image: String
}

type AuthPayload {
  token: String
  role: String
}
```
Project Dependencies
1:Backend:

- **@apollo/client: Apollo Client for managing GraphQL queries and mutations.
- **apollo-server: Apollo Server for setting up a GraphQL server.
- **bcryptjs: Library for hashing passwords.
- **dotenv: Module for loading environment variables.
- **graphql: GraphQL schema and query language.
- **jsonwebtoken: Library for handling JSON Web Tokens.
- **mongoose: MongoDB object modeling tool.
- **"apollo-server-core": "^3.5.0"
- **express": "~4.16.1
  
2:Frontend

- **@apollo/client: Apollo Client for managing GraphQL queries and mutations.
- **chart.js and react-chartjs-2: Libraries for rendering charts and graphs.
- **react-bootstrap: React components for Bootstrap styling.
- **react-redux and @reduxjs/toolkit: Libraries for managing global state in React.
- **react-router-dom: Library for handling routing in React applications.
- **framer-motion: ^11.3.31
- **graphql: ^15.7.2
- **jsonwebtoken: ^9.0.2
- **react-bootstrap-icons: ^1.11.4
- **react-helmet: ^6.1.0
- **react-infinite-scroll-component: ^6.1.0

#DevDependencies
- **@testing-library/jest-dom: ^6.5.0
- **@testing-library/react: ^16.0.1
- **@testing-library/user-event: ^14.5.2
- **browserify-zlib: ^0.2.0
- **jest: ^27.5.1
  
#Adding a New Feature
Create a new branch for your feature:

```bash
git checkout -b feature/my-new-feature
```
Make your changes and commit them with a meaningful message:

```bash
git commit -m "Added new feature X"
```
Push your changes to the remote repository:

```bash
git push origin feature/my-new-feature
```
Create a pull request and request code reviews.

5:Testing and Quality Assurance
The SMS project includes comprehensive unit, integration, and end-to-end tests to ensure quality.

1:Running Tests
-Navigate to the backend or frontend directory.
-Run the tests using Jest or Mocha:
```bash
npm test
```
2:Tools Used
-Jest: For unit testing.
-Mocha and Chai: For backend testing.
-React Testing Library: For frontend component testing.
-Playwright: For end-to-end testing


6:Deployment
1:Deploying to Vercel and Render
-Create accounts on Vercel and Render.
-Connect your GitHub repository to Vercel for frontend deployment and Render for backend deployment.
-Set up the environment variables as needed in the respective platforms.
-Deploy your application and ensure all services are running correctly.

7:License
This project is licensed under the MIT License - see the LICENSE file for details.
```bash

Copy and paste the above markdown code into your `README.md` file in your GitHub repository. This will give you a well-structured README that is informative and helpful for other developers or users who come across your project.
```
