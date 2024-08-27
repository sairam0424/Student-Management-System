import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
  }

  type Token {
    token: String
    role:String
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token 
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
`;
export default typeDefs;

// if possible add the role in input UseSignInInput role:String