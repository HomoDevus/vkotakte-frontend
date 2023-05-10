type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface User {
  name: string
  city: string
  age: number
  avatar: string
  education: string
  friends: string[]
}

export interface UserInfoRequest extends User {
  id: string
}

export interface UserResponse extends User {
  _id: string
}

export type RegisterRequest = Optional<
  Omit<UserInfoRequest, 'id'>,
  'avatar' | 'education'
>

export type AuthResponse = { token: string }

export type LoginData = {
  email: string
  password: string
}

export interface PublicationRequest {
  title: string
  description: string
  image?: string
  userId: string
}

export interface PublicationResponse extends PublicationRequest {
  likes: string[]
  _id: string
  createdAt: Date
  updatedAt: Date
}

export type ImageResponse = { data: Buffer }

export type LikePublicationRequest = {
  publicationId: string
  like: boolean
}
