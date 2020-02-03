import { Auth } from '@vown/auth'
import { IUserProfileDetails } from '@vown/types'
import { action } from 'mobx'

const userAction = {
  updateUserDetails: action((userData: IUserProfileDetails) => {
    Auth.UpdateDetails(userData)
  }),
}

export default userAction
