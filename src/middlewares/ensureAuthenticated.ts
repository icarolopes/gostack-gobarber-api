import { NextFunction, Request, Response } from 'express'
import { authConfig } from '../config/auth'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  reponse: Response,
  next: NextFunction
): void {
  // * Validacao do token JWT

  const authHeader = request.headers.authorization

  if (!authHeader) throw new Error('JWT token is missing!')

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new Error('Invalid JWT token')
  }
}
