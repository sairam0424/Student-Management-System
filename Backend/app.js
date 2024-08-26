import {ApolloServer} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import typeDefs from './schemaGql.js'

import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

mongoose.connect(MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(console.log("MongoDb Connected"))
.catch((err)=>{console.log(err.message)})


//import models here
import './models/Quote.js'
import './models/UserModel.js'
import resolvers from './resolvers.js'



const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🐵🙊🙈 Server ready at ${url}`);
});

