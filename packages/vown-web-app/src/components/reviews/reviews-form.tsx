import React, { useState } from 'react'
import {
  FormGroup,
  Input,
  FormLabel,
  Switch,
  Box,
  Typography,
  Button,
  FormControlLabel,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import Reviews from '@vown/reviews'
import auth from '@vown/auth'

const ReviewForm = () => {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState(0)
  const [experience, setExperience] = useState(0)
  const [rating, setRating] = useState(0)
  const [recommends, setRecommends] = useState(false)
  const [approves, setApproves] = useState(false)

  const submitData = async () => {
    const token = await auth.GetToken()
    const userId = await auth.GetId()

    if (token && userId) {
      const ReviewsMod = new Reviews(token, userId)

      ReviewsMod.create(
        {
          title,
          user_id: userId,
          landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
          difficulty_rating: difficulty,
          experience_rating: experience,
          rating,
          approve_of_landlord: approves,
          recommends,
        },
        (err, data) => {
          if (err) return console.log({ err })

          console.log({ data, err })
        }
      )
    }
  }

  return (
    <FormGroup>
      <FormLabel>Create Review</FormLabel>
      <Input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input placeholder="user id" value="3c56afb7-8336-44f4-b784-6ecb72a14d31" />
      <Input placeholder="landlord id" value="9dd53577-b9aa-4024-beaa-1a38d3bba38b" />
      <FormControlLabel
        control={
          <Switch
            checked={approves}
            onChange={e => setApproves(e.target.checked)}
            value="Reccomends"
            inputProps={{ 'aria-label': 'recommends checkbox' }}
          />
        }
        label="Reccomends"
      />
      <FormControlLabel
        control={
          <Switch
            checked={recommends}
            onChange={e => setRecommends(e.target.checked)}
            value="Approves of Landlord"
            inputProps={{ 'aria-label': 'approves landlord checkbox' }}
          />
        }
        label="Approves Landlord"
      />
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Difficulty Rating</Typography>
        <Rating
          name="difficulty-rating"
          value={difficulty}
          onChange={(_, newValue) => {
            setDifficulty(newValue)
          }}
        />
        <Typography component="legend">Experience Rating</Typography>
        <Rating
          name="experience-rating"
          value={experience}
          onChange={(_, newValue) => {
            setExperience(newValue)
          }}
        />
        <Typography component="legend">Overall Rating</Typography>
        <Rating
          name="overall-rating"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue)
          }}
        />
      </Box>
      <Button onClick={submitData} type="submit" variant="contained">
        Submit
      </Button>
    </FormGroup>
  )
}

export default ReviewForm
