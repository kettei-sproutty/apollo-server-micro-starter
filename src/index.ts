import { ApolloServer } from 'apollo-server-micro'
import AuthDirective from './auth'
import typeDefs from './models'
import resolvers from './resolvers'
import createSession from './utils/createSession'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ctx => await createSession(ctx.req, ctx.res),
  schemaDirectives: { auth: AuthDirective },
})

export default server
