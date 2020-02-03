import authentication from './authentication'
import notification from './notification'
import review from './review'
import user from './user'
export { default as state } from './state'

export const actions = {
  ...authentication,
  ...notification,
  ...review,
  ...user,
}
