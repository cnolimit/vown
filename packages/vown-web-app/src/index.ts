import Review from '@vown/reviews'

Review.create(
  {
    title: 'Second Review',
    difficulty_rating: 4,
    experience_rating: 4,
    approve_of_landlord: true,
    recommends: true,
  },
  (err, data) => {
    console.log({ data, err })
    if (err) {
      console.log({ err })
      return
    }
  }
)
