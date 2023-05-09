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
