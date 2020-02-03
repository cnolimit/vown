import { FormGroup, Theme, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/styles'
import { IReview } from '@vown/types'
import React, { useState } from 'react'
import { Button, Input, MultilineInput } from '../'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '25px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #F0F0F2',
    overflow: 'hidden',
  },
  title: {
    fontWeight: 700,
    fontSize: '1.5em',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  input: {
    marginBottom: '25px',
  },
  rating: {
    padding: '0',
    marginBottom: '15px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  separator: {
    margin: '25px 0',
    border: '1px solid #F0F0F2',
  },
}))
interface IReviewForm {
  onSubmit: (review: IReview) => {}
}

const ReviewForm = (props: IReviewForm) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)
  const classes = useStyles()

  const [experience] = useState(0)
  const [difficulty] = useState(0)
  const [approves] = useState(false)
  const [recommends] = useState(false)

  const _clear = () => {
    setTitle('')
    setDescription('')
    setRating(0)
  }

  const submitData = async () => {
    props.onSubmit({
      rating,
      recommends,
      user_id: '',
      title: title.trim(),
      description: description.trim(),
      difficulty_rating: difficulty,
      experience_rating: experience,
      approve_of_landlord: approves,
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
    })
    _clear()
  }

  return (
    <FormGroup className={classes.card}>
      <Typography className={classes.title} variant="h2">
        Create Review
      </Typography>
      <div className={classes.separator}></div>
      <div className={classes.rating}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="overall-rating"
          size="large"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue)
          }}
        />
      </div>
      <Input
        type="text"
        fieldLabel="Title"
        fieldName="title"
        fieldValue={title}
        className={classes.input}
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <MultilineInput
        type="text"
        fieldLabel="Review"
        fieldName="description"
        fieldValue={description}
        className={classes.input}
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <Button onClick={submitData} type="submit" variant="contained">
        Submit Review
      </Button>
    </FormGroup>
  )
}

export default ReviewForm
