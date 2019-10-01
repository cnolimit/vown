/// <reference lib="dom" />
import { IUserDetails } from '@vown/types'
import localforage from 'localforage'
import authInit from './auth-init'

class Auth {
  private app = authInit
  private AUTH_STORAGE = '__vown-session__'
  private _setSession = async (data: IUserDetails | null) =>
    localforage.setItem(this.AUTH_STORAGE, data)
  private _deleteSession = async () => localforage.removeItem(this.AUTH_STORAGE)

  public SignIn = async (username: string, password: string) => {
    const { user } = await this.app.auth().signInWithEmailAndPassword(username, password)
    if (user) {
      const userDetails = await this.app
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
      await this._setSession(userDetails.data() as IUserDetails)
    }
    return await this.GetPersonalDetails()
  }

  public SignUp = async (username: string, password: string) => {
    const { user } = await this.app.auth().createUserWithEmailAndPassword(username, password)
    if (user) {
      const userDetails = await this.app
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
      await this._setSession(userDetails.data() as IUserDetails)
    }
    return await this.GetPersonalDetails()
  }

  public SignOut = async () => {
    await this._deleteSession()
    this.app.auth().signOut()
  }

  public isLoggedIn = async () => {
    const user = await localforage.getItem<IUserDetails>(this.AUTH_STORAGE)
    if (user) return true
    return false
  }

  public GetUserId = async () => {
    const user = await localforage.getItem<IUserDetails>(this.AUTH_STORAGE)
    if (user) return user.uid
    return false
  }

  public GetPersonalDetails = async (): Promise<IUserDetails | null> =>
    await localforage.getItem(this.AUTH_STORAGE)
}

export default new Auth()
