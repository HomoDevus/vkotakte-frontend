import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthResponse, RegisterRequest, UserInfoRequest } from '../types';
import { LoginData } from '../types';
import { getCookie } from '../utils';
import { JWT_COOKIE_NAME } from '../consts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getCookie(JWT_COOKIE_NAME)

      if (token) {
        headers.set('Authorization', token)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: userData => ({
        url: '/register',
        method: 'POST',
        body: userData
      })
    }),
    login: builder.mutation<AuthResponse, LoginData>({
      query: loginData => ({
        url: '/login',
        method: 'POST',
        body: loginData
      })
    }),
    getUserInfo: builder.query<UserInfoRequest, string>({
      query: userId => `/user-info/${userId}`
    })
  })
})

export const { useGetUserInfoQuery, useRegisterMutation, useLoginMutation } = apiSlice