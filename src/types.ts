type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type UserInfoRequest = {
  id: string
  name: string
  city: string
  age: number
  avatar: string
  education: string
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
  title: string;
  description: string;
  image?: string;
  userId: string;
}

export interface PublicationResponse extends PublicationRequest {
  likes: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ImageResponse = {data: Buffer};