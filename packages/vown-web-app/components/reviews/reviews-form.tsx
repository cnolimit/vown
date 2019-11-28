import { Auth } from '@vown/auth'
import { ReviewForm } from '@vown/components'
import { IReview } from '@vown/types'
import React from 'react'
import { actions } from '../../store'

const ReviewFormContainer = () => {
  const submitData = async (review: IReview) => {
    const userId = await Auth.GetUserId()

    if (userId) {
      actions.createReview({
        ...review,
        user_id: userId,
      })
    }
  }

  return <ReviewForm onSubmit={submitData} />
}

export default ReviewFormContainer
