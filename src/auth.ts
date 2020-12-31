import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-micro'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import type { RoleLevel, UserSession } from './typings/auth'
import { Role } from './utils/role'

const checkRole = (role: Role, requiredRole: Role) => {
  const level: RoleLevel = {
    ADMIN: 0,
    MODERATOR: 1,
    USER: 2,
    LOGGED_IN: 3,
    NOT_LOGGED_IN: 4,
  }

  if (level[role] <= level[requiredRole]) return true
  return false
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const requiredRole: Role = this.args.requires
    const originalResolve = field.resolve || defaultFieldResolver
    field.resolve = (...args) => {
      const context = args[2]
      const user: UserSession | null = context.user || null
      const isAuthorizated = checkRole(user?.role || Role.NOT_LOGGED_IN, requiredRole)
      if (!isAuthorizated) {
        throw new AuthenticationError(`Required Role: ${requiredRole}`)
      }
      return originalResolve.apply(this, args)
    }
  }
}

export default AuthDirective
