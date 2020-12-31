import { gql } from 'apollo-server-micro'
import userTypeDefs from './user'

const rootTypeDefs = gql`
  directive @auth(requires: Role!) on FIELD_DEFINITION

  scalar Date
  scalar Time

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

const typeDefs = [rootTypeDefs, userTypeDefs]

export default typeDefs
