import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthResponse, RegisterRequest, UserInfoRequest } from '../types';
import { LoginData } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL}),
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
    getUserInfo: builder.query<UserInfoRequest, string | undefined>({
      query: userId => `/user-info/${userId || ''}`
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetUserInfoQuery, useRegisterMutation, useLoginMutation } = apiSlice