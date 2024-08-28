import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import cors from 'cors'

import mongoose from "mongoose";
// import { JWT_SECRET, MONGO_URL } from "./config.js";

import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDb Connected"))
  .catch((err) => {
    console.log(err.message);
  });

//import models here

import "./models/UserModel.js";
import "./models/StudentSchema.js"
import resolvers from "./resolvers.js";
const context = ({ req }) => {
  const { authorization } = req.headers;

  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

    return { userId };
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🐵🙊🙈 Server ready at ${url}`);
});
