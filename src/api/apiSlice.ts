import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AuthResponse,
  ImageResponse,
  PublicationRequest,
  PublicationResponse,
  RegisterRequest,
  UserInfoRequest
} from '../types'
import { LoginData } from '../types'
import { getCookie } from '../utils'
import { JWT_COOKIE_NAME } from '../consts'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: headers => {
      const token = getCookie(JWT_COOKIE_NAME)

      if (token) {
        headers.set('Authorization', token)
      }

      return headers
    },
  }),
  tagTypes: ['Publications'],
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: userData => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginData>({
      query: loginData => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    getUserInfo: builder.query<UserInfoRequest, string>({
      query: userId => `/user-info/${userId}`,
    }),
    getImage: builder.query<ImageResponse, string>({
      query: imageId => `/download-image/${imageId}`
    }),
    addPublication: builder.mutation<PublicationResponse, PublicationRequest>({
      query: publicationData => ({
        url: '/add-publication',
        method: 'POST',
        body: publicationData
      }),
      invalidatesTags: ['Publications']
    }),
    getUserPublications: builder.query<PublicationResponse[], string>({
      query: userId => `/publications/${userId}`,
      providesTags: ['Publications'],
      transformResponse: (response: PublicationResponse[]) => response.reverse()
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetImageQuery,
  useAddPublicationMutation,
  useGetUserPublicationsQuery
} =
  apiSlice
