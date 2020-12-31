import { IResolvers } from 'apollo-server'

const resolvers: IResolvers = {
  Query: {
    me: (_parent, _args, { user }) => user,
    users: () => [],
  },
  Mutation: {
    signIn: (_parent, { username }) => `${username} logged in`,
    signOn: (_parent, { username }) => `Welcome, ${username}`,
    signOut: async (_parent, _args, { destroySession }) => await destroySession(),
    userDelete: (_parent, { username }) => `${username} deleted`,
  },
}

export default resolvers
