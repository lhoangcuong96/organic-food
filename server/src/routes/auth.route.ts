import envConfig from '@/config'
import { TokenType } from '@/constants/type'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '@/controllers/auth.controller'
import { requireLoggedHook } from '@/hooks/auth.hooks'
import {
  LoginBody,
  LoginBodyType,
  LoginRes,
  LoginResType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBody,
  RegisterBodyType,
  RegisterRes,
  RegisterResType
} from '@/schemaValidations/auth.schema'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import { addMilliseconds } from 'date-fns'
import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'
import ms from 'ms'

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{
    Reply: RegisterResType
    Body: RegisterBodyType
  }>(
    '/register',
    {
      schema: {
        response: {
          200: RegisterRes
        },
        body: RegisterBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { session, account } = await registerController(body)
      if (envConfig.COOKIE_MODE) {
        reply
          .setCookie(TokenType.AccessToken, session.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: addMilliseconds(new Date(), ms(envConfig.ACCESS_TOKEN_EXPIRES_IN)),
            sameSite: 'none',
            domain: envConfig.DOMAIN
          })
          .setCookie(TokenType.RefreshToken, session.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: addMilliseconds(new Date(), ms(envConfig.ACCESS_TOKEN_EXPIRES_IN)),
            sameSite: 'none',
            domain: envConfig.DOMAIN
          })
          .send({
            message: 'Đăng ký thành công',
            data: {
              accessToken: session.accessToken,
              refreshToken: session.refreshToken,
              account
            }
          })
      } else {
        reply.send({
          message: 'Đăng ký thành công',
          data: {
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            account
          }
        })
      }
    }
  )
  fastify.post<{ Reply: MessageResType }>(
    '/logout',
    {
      schema: {
        response: {
          200: MessageRes
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      const accessToken = envConfig.COOKIE_MODE
        ? request.cookies.accessToken
        : request.headers.authorization?.split(' ')[1]
      const message = await logoutController(accessToken as string)
      if (envConfig.COOKIE_MODE) {
        reply
          .clearCookie(TokenType.AccessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .clearCookie(TokenType.RefreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .send({
            message
          })
      } else {
        reply.send({
          message
        })
      }
    }
  )
  fastify.post<{ Reply: LoginResType; Body: LoginBodyType }>(
    '/login',
    {
      schema: {
        response: {
          200: LoginRes
        },
        body: LoginBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { session, account } = await loginController(body)
      if (envConfig.COOKIE_MODE) {
        reply
          .setCookie('accessToken', session.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: addMilliseconds(new Date(), ms(envConfig.ACCESS_TOKEN_EXPIRES_IN)),
            sameSite: 'none',
            domain: envConfig.DOMAIN
          })
          .setCookie('accessToken', session.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: addMilliseconds(new Date(), ms(envConfig.ACCESS_TOKEN_EXPIRES_IN)),
            sameSite: 'none',
            domain: envConfig.DOMAIN
          })
          .send({
            message: 'Đăng nhập thành công',
            data: {
              accessToken: session.accessToken,
              refreshToken: session.refreshToken,
              account
            }
          })
      } else {
        reply.send({
          message: 'Đăng nhập thành công',
          data: {
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            account
          }
        })
      }
    }
  )

  fastify.post(
    '/refresh-token',
    {
      schema: {
        response: {
          200: LoginRes
        }
      },
      preValidation: fastify.auth([requireLoggedHook])
    },
    async (request, reply) => {
      const { refreshToken } = request.body as RefreshTokenBodyType
      const accessToken = request.headers.authorization!.split(' ')[1]
      const { session } = await refreshTokenController(accessToken, refreshToken)
      reply.send({
        message: 'Đăng nhập thành công',
        data: {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken
        }
      })
    }
  )
}
