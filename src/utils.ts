import { JWT_COOKIE_NAME } from './consts'
import { RcFile } from 'antd/es/upload'
import { message } from 'antd'

type TokenData = {
  id: string
  user_type_id: 0 | 1
  iat: number
}

export const getCookie = (key: string) =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=')
    const storedKey = item[0]
    const storedValue = item[1]

    return key === storedKey ? decodeURIComponent(storedValue) : total
  }, '')

export const setCookie = (key: string, value: string, numberOfDays: number) => {
  const now = new Date()

  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)

  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`
}

export function decodeJWT(token: string): TokenData | undefined {
  if (!token) return

  token = token.split(' ')[1] // Remove Bearer from string

  let b64DecodeUnicode = (str: string) =>
    decodeURIComponent(
      Array.prototype.map
        .call(
          atob(str),
          c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
        )
        .join(''),
    )

  let parseJwt = (token: string) =>
    JSON.parse(
      b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')),
    )

  return parseJwt(token)
}

export function getIdFromToken() {
  const cookie = getCookie(JWT_COOKIE_NAME)

  if (cookie === null) return

  return decodeJWT(cookie)?.id
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isRightSize = file.size / 1024 / 1024 < 12
  if (!isRightSize) {
    message.error('Image must smaller than 12MB!')
  }
  return isJpgOrPng && isRightSize
}
