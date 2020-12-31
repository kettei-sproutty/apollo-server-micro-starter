import { ApolloError } from 'apollo-server-micro'
import { applySession, SessionOptions } from 'next-iron-session'
import { CreateContextFn, UserSession } from '../typings/auth'

const createContext: CreateContextFn = async (req, res) => {
  if (!process.env.PROD) {
    const dotenv = require('dotenv')
    dotenv.config()
  }

  const options: SessionOptions = {
    cookieName: 'auth-session',
    password: process.env.PASSWORD!,
    cookieOptions: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: Boolean(process.env.PROD),
    },
  }

  return applySession(req, res, options)
    .then(() => {
      const setSession = async (value: UserSession) => {
        req.session!.set('auth-session', value)
        return await req.session!.save()
      }

      const destroySession = async () => {
        req.session!.destroy()
        return await req.session!.save()
      }

      const user: UserSession | null = req.session!.get('auth-session') || null

      return { setSession, destroySession, user }
    })
    .catch(error => new ApolloError(error))
}

export default createContext
