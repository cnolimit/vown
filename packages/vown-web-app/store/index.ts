import authentication from './authentication'
import notification from './notification'
import review from './review'
export { default as state } from './state'

export const actions = {
  ...authentication,
  ...notification,
  ...review,
}
