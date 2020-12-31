import { ApolloError } from 'apollo-server-micro'
import { IncomingMessage, ServerResponse } from 'http'
import { Session } from 'next-iron-session'
import { Role } from '../utils/role'

export type ReqWithSession = IncomingMessage & { session?: Session }

export type UserSession = {
  _id: string
  role: Role
}

export type Context = {
  user: UserSession | null
  setSession: (value: UserSession) => Promise<void>
  destroySession: () => Promise<void>
}

export type CreateContextFn = (
  req: ReqWithSession,
  res: ServerResponse,
) => Promise<Context | ApolloError>

export type Args = {
  requires: Role
}

export type RoleLevel = {
  [K in Role]: number
}
