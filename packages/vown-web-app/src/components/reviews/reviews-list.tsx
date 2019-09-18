import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import { CardHeader, Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { IReview } from '@vown/types'
import Reviews from '@vown/reviews'
import auth from '@vown/auth'

const App = () => {
  const [reviews, setReviews] = useState<IReview[]>([])
  const [fetching, setFecting] = useState(true)

  useEffect(() => {
    const fetchUserReviews = async () => {
      const token = await auth.GetToken()
      const userId = await auth.GetId()

      if (token && userId) {
        const ReviewsMod = new Reviews(token, userId)
        const userReviews = await ReviewsMod.retrieve().user()

        if (userReviews) {
          setReviews(userReviews)
        }
        setFecting(false)
      }
    }
    fetchUserReviews()
  }, [])

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
