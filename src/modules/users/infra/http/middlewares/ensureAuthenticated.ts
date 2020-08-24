import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/AppError'

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

  if (!authHeader) throw new AppError('JWT token is missing!', 401)

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
