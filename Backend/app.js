/* This code snippet is setting up a GraphQL server using Apollo Server in a Node.js environment.
Here's a breakdown of what each part of the code is doing: */
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./Graphql/schemaGql.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDb Connected"))
  .catch((err) => {
    console.log(err.message);
  });

import "./models/UserModel.js";
import "./models/StudentSchema.js";
import resolvers from "./resolvers/resolvers.js";
import context from "./Middlewares/jwtauthentication.js";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🙈🙊🐵 Server ready at ${url}`);
});
