# Implementing NEXTJS api routes

> /api/graphql.ts

```ts
import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import AuthDirective from '../../graphql/auth'
import typeDefs from '../../graphql/models'
import resolvers from '../../graphql/resolvers'
import createSession from '../../graphql/session'


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: async ({ req, res }) => {
    const { saveSession, deleteSession, user } = await createSession(req, res, password)
    return { user, saveSession, deleteSession }
  },
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
```
