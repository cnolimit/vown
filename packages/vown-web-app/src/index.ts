import Review from '@vown/reviews'

Review.create(
  {
    title: 'Second Review',
    difficulty_rating: 4,
    experience_rating: 4,
    approve_of_landlord: true,
    recommends: true,
    landlord_id: '',
    user_id: '3c56afb7-8336-44f4-b784-6ecb72a14d31',
    rating: 4,
  },
  (err, data) => {
    console.log({ data, err })
    if (err) {
      console.log({ err })
      return
    }
  }
)
