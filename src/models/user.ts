import { gql } from 'apollo-server-micro'

const userTypeDefs = gql`
  enum Role {
    ADMIN
    MODERATOR
    USER
    LOGGED_IN
    NOT_LOGGED_IN
  }

  type User {
    _id: ID!
    username: String!
    role: Role!
  }

  extend type Query {
    me: User @auth(requires: LOGGED_IN)
    users: [User!] @auth(requires: MODERATOR)
  }

  extend type Mutation {
    signIn(username: String): String @auth(requires: NOT_LOGGED_IN)
    signOn(username: String): String @auth(requires: NOT_LOGGED_IN)
    signOut: String @auth(requires: LOGGED_IN)
    userDelete(username: String!): String @auth(requires: ADMIN)
  }
`

export default userTypeDefs
