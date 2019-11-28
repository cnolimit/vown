import { INotification } from '@vown/types'
import { action } from 'mobx'
import { constants } from '../utils'
import state from './state'

const notificationActions = {
  pushNotification: action((notification: INotification) => {
    if (state.notification.length === 2) return

    const timeoutId: number = setTimeout(() => {
      clearTimeout(timeoutId)
      state.notification = state.notification.filter(n => n.id !== timeoutId)
    }, constants.NOTIFICATION_TIMEOUT)

    state.notification.push({
      id: timeoutId,
      message: notification.message,
      type: notification.type,
    })
  }),
}

export default notificationActions
