import {quotes,users} from './fakedb.js'
import {randomBytes} from 'crypto'
const resolvers = {
    Query:{
       users:()=>users,
       user:(_,{id})=>users.find(user=>user.id == id),
       quotes:()=>quotes,
       iquote:(_,{by})=>quotes.filter(quote=>quote.by == by)
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=>quote.by == ur.id)
    },
}
export default resolvers