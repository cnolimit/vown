import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import { CardHeader, Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { IReview } from '@vown/types'
import Review from '@vown/reviews'

const App = () => {
  const [reviews, setReviews] = useState<IReview[]>([])
  const [fetching, setFecting] = useState(true)

  useEffect(() => {
    console.log('YOLO')

    Review.retrieve.user(
      '3c56afb7-8336-44f4-b784-6ecb72a14d31',
      (err, data: { reviews: IReview[] }) => {
        if (err) return setFecting(false)
        if (data) {
          setReviews(data.reviews)
        }
        setFecting(false)
      }
    )
  }, [reviews.length])

  return (
    <React.Fragment>
      {fetching
        ? 'Loading...'
        : reviews.map(review => (
            <Card key={review.id}>
              <CardHeader title={review.title} />
              <Box component="fieldset" borderColor="transparent">
                <Typography component="legend">Rating</Typography>
                <Rating value={Number(review.rating)} readOnly />
              </Box>
              <Box component="fieldset" borderColor="transparent">
                <Typography component="legend">
                  {review.recommends ? 'Reccomends this' : 'Does not reccomend this'} landlord
                </Typography>
                <Typography component="legend">
                  {review.approve_of_landlord ? 'Approves this' : 'Does not approve this'} landlord
                </Typography>
              </Box>
            </Card>
          ))}
    </React.Fragment>
  )
}

export default App
