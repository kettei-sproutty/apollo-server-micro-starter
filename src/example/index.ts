import { ApolloServer } from 'apollo-server'
import AuthDirective from '../auth'
import typeDefs from '../models'
import resolvers from '../resolvers'
import createSession from '../utils/createSession'

if (!process.env.PROD) {
  const dotenv = require('dotenv')
  dotenv.config()
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ctx => await createSession(ctx.req, ctx.res),
  schemaDirectives: {
    auth: AuthDirective,
  },
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
})

server
  .listen(process.env.PORT)
  .then(({ url }) => console.log(`Listening on: ${url}`))
  .catch(console.error)
