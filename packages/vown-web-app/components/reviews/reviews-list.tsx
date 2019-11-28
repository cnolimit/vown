import { makeStyles } from '@material-ui/styles'
import { OverflowLoader, ReviewCard } from '@vown/components'
import format from 'date-fns/format'
import React, { useEffect, useState } from 'react'
import { actions, state } from '../../store'
import { truncate } from '../../utils/helpers'

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '330px 330px 330px',
    gridAutoRows: '275px',
  },
})

const ReviewList = () => {
  const [fetching, setFecting] = useState(true)

  useEffect(() => {
    const fetchUserReviews = async () => {
      await actions.getUserReviews()
      setFecting(false)
    }
    fetchUserReviews()
  }, [])

  const classes = useStyles()
  return (
    <OverflowLoader loading={fetching}>
      <div className={classes.container}>
        {state.reviews.map(review => (
          <ReviewCard
            key={review.id}
            title={review.title}
            rating={review.rating}
            date={format(new Date(review.createdAt), 'MMMM R')}
            description={truncate(review.description, 85, 0, '...')}
          />
        ))}
      </div>
    </OverflowLoader>
  )
}

export default ReviewList
