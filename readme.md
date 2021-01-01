This is a small starter pack to integrate apollo-server-micro, where `authorization` and `authentication` are managed through **"directives"**.

### Run the example:

> Resolvers are placeholders.

```sh
git clone https://github.com/kettei-sproutty/apollo-server-micro-starter.git
yarn
yarn dev
```


# Implementing NEXTJS api routes
> If you are using nextjs replace ".env" and "dotenv" with the nextjs environment variable management (next.config.js): ![Click here for the documentation](https://nextjs.org/docs/basic-features/environment-variables)


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
