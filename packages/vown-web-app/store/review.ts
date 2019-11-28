import { createReview, retrieveReview } from '@vown/reviews'
import { ERRORS, IReview, NOTIFICATION_STATES, SUCCESS } from '@vown/types'
import { action } from 'mobx'
import notifications from './notification'
import state from './state'

const reviewActions = {
  getUserReviews: action(async () => {
    const { reviews, error } = await retrieveReview.user()
    if (error) {
      return notifications.pushNotification({
        message: ERRORS[error.code],
        type: NOTIFICATION_STATES.ERROR,
      })
    }
    state.reviews = reviews
  }),

  createReview: action(async (review: IReview) => {
    const { reviews, error } = await createReview(review)
    if (error) {
      return notifications.pushNotification({
        message: ERRORS[error.code],
        type: NOTIFICATION_STATES.ERROR,
      })
    }

    state.reviews = reviews
    return notifications.pushNotification({
      message: SUCCESS.SUCCESS_CREATED_REVIEW,
      type: NOTIFICATION_STATES.SUCCESS,
    })
  }),
}

export default reviewActions
