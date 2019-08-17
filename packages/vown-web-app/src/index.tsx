import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import Review from '@vown/reviews'
import { IReview } from '@vown/types'

const App = () => {
  const [reviews, setReviews] = useState<IReview[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    Review.retrieve.user(
      '3c56afb7-8336-44f4-b784-6ecb72a14d31',
      (err: any, data: { reviews: IReview[] }) => {
        if (err) setFetching(false)

        if (data && !reviews.length) {
          setReviews(data.reviews)
        }
      }
    )
  }, reviews)

  return fetching ? (
    <React.Fragment>
      {reviews.map(review => {
        return <h1 key={review.id}>{review.title}</h1>
      })}
    </React.Fragment>
  ) : null
}

const app = document.getElementById('app')

ReactDOM.render(<App />, app)
