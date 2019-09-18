import Review from '../index'
import axios from 'axios'

jest.mock('axios')

const reviewMod = new Review('token', 'user_id')
const landlordID = '9dd53577-b9aa-4024-beaa-1a38d3bba38b'
const testReview = {
  recommends: true,
  landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
  id: '84982455-17ba-49a5-b540-0844cd220bf0',
  title: 'Great Landlord',
  user_id: 'Zo27YeFFKkfTyf9wvV6Qe4dT5mf2',
  difficulty_rating: 2,
  experience_rating: 3,
  rating: 4,
  approve_of_landlord: true,
}

const reviews = {
  reviews: [testReview],
  landlord_id: landlordID,
}

describe('Testing Review module', () => {
  beforeAll(() => {
    //@ts-ignore
    axios.get.mockResolvedValue({ data: reviews })
    //@ts-ignore
    axios.put.mockResolvedValue({ data: reviews })
    //@ts-ignore
    axios.post.mockResolvedValue({ data: reviews })
  })

  it('Should create a new review', async () => {
    return reviewMod.create(testReview).then((data: any) => {
      expect(data).toEqual(reviews)
    })
  })
  it('Should update a review', () => {
    return reviewMod.update(testReview).then((data: any) => {
      expect(data).toEqual(reviews)
    })
  })
  it('Should retrieve a user review', () => {
    return reviewMod
      .retrieve()
      .user()
      .then((data: any) => {
        expect(data).toEqual(reviews)
      })
  })
  it('Should retrieve a landlord review', () => {
    return reviewMod
      .retrieve()
      .landlord(landlordID)
      .then((data: any) => {
        expect(data).toEqual(reviews)
      })
  })
})
