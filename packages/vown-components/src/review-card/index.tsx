import { Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  card: {
    border: '2px solid #F0F0F2',
    width: '300px',
    height: '250px',
    padding: '25px',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundColor: '#fff',
    zIndex: 2,
  },
  title: {
    fontWeight: 700,
    fontSize: '1.5em',
    marginTop: '10px',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#92999E',
  },
  description: {
    fontWeight: 400,
    marginTop: '10px',
    fontSize: '1.2em',
    width: '100%',
    height: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

interface IReviewCard {
  title: string
  rating: number
  date: string
  description: string
}

const ReviewCard = (props: IReviewCard) => {
  const classes = useStyles()
  return (
    <div className={classes.card}>
      <Rating
        data-testid="review-card-rating"
        size="medium"
        value={Number(props.rating)}
        readOnly
      />
      <Typography data-testid="review-card-title" className={classes.title} variant="h2">
        {props.title.toLowerCase()}
      </Typography>
      <Typography data-testid="review-card-date" className={classes.subtitle} variant="subtitle1">
        {props.date}
      </Typography>
      <p data-testid="review-card-description" className={classes.description}>
        {props.description}
      </p>
    </div>
  )
}

export default ReviewCard
