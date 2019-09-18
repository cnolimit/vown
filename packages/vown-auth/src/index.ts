/// <reference lib="dom" />
import * as firebase from 'firebase/app'
import { IUserDetails } from '@vown/types'
import localforage from 'localforage'
import axios from 'axios'
import 'firebase/auth'
import 'firebase/firestore'

class Auth {
  private app = firebase.initializeApp({
    apiKey: 'AIzaSyARkIZDrZNFCSYd6At-tOmy8pLBY3EN3ng',
    authDomain: 'veriown-reviews.firebaseapp.com',
    databaseURL: 'https://veriown-reviews.firebaseio.com',
    projectId: 'veriown-reviews',
    storageBucket: 'veriown-reviews.appspot.com',
    messagingSenderId: '769049122151',
    appId: '1:769049122151:web:46fcf538595daaa2',
  })
  private AUTH_STORAGE = '__vown-session__'
  private AUTH_TOKEN = '__vown-session-token__'
  private _setSession = async (data: IUserDetails | null) =>
    localforage.setItem(this.AUTH_STORAGE, data)
  private _setToken = async (token: string) => localforage.setItem(this.AUTH_TOKEN, token)
  private _deleteSession = async () => localforage.removeItem(this.AUTH_STORAGE)
  private _deleteToken = async () => localforage.removeItem(this.AUTH_TOKEN)
  private _getPersonalDetails = async (): Promise<IUserDetails | null> => {
    const user = this.app.auth().currentUser
    if (user) {
      const userDetails = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
      return userDetails.data() as IUserDetails
    }
    return null
  }
  private _getToken = async (token_id: string, user: string) => {
    const res = await axios.post(
      'https://us-central1-veriown-reviews.cloudfunctions.net/v1/api/sessions/token',
      { uid: token_id, user }
    )
    return res.data
  }
  public SignIn = async (username: string, password: string) => {
    await this.app.auth().signInWithEmailAndPassword(username, password)
    const details = await this._getPersonalDetails()
    if (details) {
      const token = await this._getToken(details.token_id, details.uid)
      await this._setToken(token.token)
      await this._setSession(details)
    }
    return await this._getPersonalDetails()
  }
  public SignUp = async (username: string, password: string) => {
    await this.app.auth().createUserWithEmailAndPassword(username, password)
    const details = await this._getPersonalDetails()
    if (details) {
      const token = await this._getToken(details.token_id, details.uid)
      await this._setToken(token.token)
      await this._setSession(details)
    }
    return await this._getPersonalDetails()
  }
  public SignOut = async () => {
    await this._deleteSession()
    await this._deleteToken()
    this.app.auth().signOut()
  }
  public isLoggedIn = async () => !!this.app.auth().currentUser
  public GetId = async () => {
    const user = (await localforage.getItem(this.AUTH_STORAGE)) as IUserDetails
    if (user) return user.uid
    return null
  }
  public GetPersonalDetails = async (): Promise<IUserDetails | null> =>
    await localforage.getItem(this.AUTH_STORAGE)
  public GetToken = async (): Promise<string | null> => await localforage.getItem(this.AUTH_TOKEN)
}

export default new Auth()
