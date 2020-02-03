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

  public SignIn = (username: string, password: string) => {
    return this.app
      .auth()
      .signInWithEmailAndPassword(username, password)
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

  public SignUp = (username: string, password: string) => {
    return this.app
      .auth()
      .createUserWithEmailAndPassword(username, password)
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

  public SignOut = () => {
    this._deleteSession()
    this.app.auth().signOut()
  }

  public UpdateDetails = (userData: IUserProfileDetails) => {
    const user = this.app.auth().currentUser
    if (user) {
      user
        .updateProfile({
          displayName: `${userData.firstName} ${userData.lastName}`,
          photoURL: userData.photo,
        })
        .then(() => {
          const details = this.GetPersonalDetails()
          if (details) {
            details.displayName
            this._setSession({
              ...details,
              displayName: user.displayName || details.displayName,
              photoURL: user.photoURL || details.photoURL,
            })
            this.app
              .firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                displayName: `${userData.firstName} ${userData.lastName}`,
                photoURL: userData.photo,
              })
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
