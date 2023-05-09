import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { notification } from 'antd'

export const rtkQueryErrorLogger: Middleware =
  (ap) => next => action => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      notification.error({ message: action.error.message, placement: 'bottomRight' })
    }

    return next(action)
  }
