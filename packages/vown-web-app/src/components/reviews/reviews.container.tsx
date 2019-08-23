import React from 'react'
import ReviewList from './reviews-list'
import ReviewForm from './reviews-form'

const Reviews = () => {
  return (
    <React.Fragment>
      <ReviewForm />
      <ReviewList />
    </React.Fragment>
  )
}

export default Reviews
