/// <reference lib="dom" />
import { IUserDetails, IUserProfileDetails } from '@vown/types'
import authInit from './auth-init'

class Auth {
  private app = authInit
  private AUTH_STORAGE = '__vown-session__'
  private _setSession = async (data: IUserDetails | null) =>
    sessionStorage.setItem(this.AUTH_STORAGE, this._stringify(data))
  private _deleteSession = () => sessionStorage.removeItem(this.AUTH_STORAGE)
  private _parse = (objStr: any) => {
    try {
      return JSON.parse(objStr)
    } catch (error) {
      return null
    }
  }
  private _stringify = (obj: any) => {
    try {
      return JSON.stringify(obj)
    } catch (error) {
      return ''
    }
  }

  public SignIn = (email: string, password: string) => {
    return this.app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          const userDetails = await this.app
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
          this._setSession(userDetails.data() as IUserDetails)
        }
        return await this.GetPersonalDetails()
      })
  }

  public SignUp = (email: string, password: string, username: string) => {
    return this.app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          this.UpdateDetails({ displayName: username })
          this._setSession({ uid: user.uid, email, displayName: username } as IUserDetails)
        }
        return await this.GetPersonalDetails()
      })
  }

  public SignOut = () => {
    this._deleteSession()
    this.app.auth().signOut()
  }

  public UpdateDetails = (userData: IUserProfileDetails) => {
    // Grab the current user details to update
    const user = this.app.auth().currentUser

    if (user) {
      // Create the unified details object to ensure we pass
      // through the same information in all updates
      const userDetails: any = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...userData,
      }

      user.updateProfile({ ...userDetails }).then(() => {
        // We get the current user details in storage. We want to
        // update the session storage so that the user can see the
        // Changes without having to logout and sign back in.
        const details = this.GetPersonalDetails()

        if (details) {
          this._setSession({ ...details, ...userDetails })

          // We need to update the users information in our database
          // so that we keep the profile object in sync with the
          // user data stored in our database.
          this.app
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update(userDetails)
        }
      })
    }
  }

  public isLoggedIn = () => {
    const user = this._parse(sessionStorage.getItem(this.AUTH_STORAGE))
    if (user) return true
    return false
  }

  public GetUserId = () => {
    const user = this._parse(sessionStorage.getItem(this.AUTH_STORAGE))
    if (user) return user.uid
    return false
  }

  public GetPersonalDetails = (): IUserDetails | null =>
    this._parse(sessionStorage.getItem(this.AUTH_STORAGE))
}

export default new Auth()
