import { Auth } from '@vown/auth'
import { INotification, IReviewObject, IUserDetails } from '@vown/types'
import { observable } from 'mobx'

interface IStateObject {
  loggedIn: boolean
  user: IUserDetails | null | boolean
  notification: INotification[]
  reviews: IReviewObject[]
}

const state = observable<IStateObject>({
  loggedIn: process.browser && Auth.isLoggedIn(),
  user: process.browser && Auth.GetPersonalDetails(),
  notification: [],
  reviews: [],
})

export default state
