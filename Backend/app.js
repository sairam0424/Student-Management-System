import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

/*
 collection/Table - Users 
                    - doc1
                    - doc2
*/
export const users = [
  {
    id: "23131",
    firstName: "mukesh",
    lastName: "kumar",
    email: "mukesh@mukeshkumar.com",
    password: "12345",
    role: "Admin",
  },
  {
    id: "4232",
    firstName: "suresh",
    lastName: "sharma",
    email: "suresh@sureshsharma.com",
    password: "12346",
    role: "User",
  },
];

/*
collection/Table - Quotes 
                      - doc1
                      - doc2
                      - etc
*/

export const quotes = [
  {
    name: "I turn coffee into code",
    by: "23131",
  },
  {
    name: "I am another quote",
    by: "23131",
  },
  {
    name: "If it works dont touch it",
    by: "4232",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id:ID!):User
    quotes:[Quote]
    iquote(by:ID!):[Quote]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    quotes:[Quote]
  }

  type Quote{

    name:String
  
    by:ID
  }
`;



const resolvers = {
  Query: {
    users: () => users,
    user:(_,{id})=>users.find(user=>user.id==id),
    quotes:() => quotes,
    iquote:(_,{by})=>quotes.filter(quote=>quote.by==by)
  },
  User:{
    quotes:(ur)=>quotes.filter(quote=>quote.by==ur.id)//filters the quotes based on the userid aand query id
  }
  
};

const server = new ApolloServer({
  typeDefs,

  resolvers,

  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🐵🙊🙈 Server ready at ${url}`);
});
