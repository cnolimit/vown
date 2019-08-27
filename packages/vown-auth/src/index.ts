import * as firebase from 'firebase'
import { IUserDetails } from '@vown/types'
import localforage from 'localforage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyARkIZDrZNFCSYd6At-tOmy8pLBY3EN3ng',
  authDomain: 'veriown-reviews.firebaseapp.com',
  databaseURL: 'https://veriown-reviews.firebaseio.com',
  projectId: 'veriown-reviews',
  storageBucket: 'veriown-reviews.appspot.com',
  messagingSenderId: '769049122151',
  appId: '1:769049122151:web:46fcf538595daaa2',
})

const AUTH_STORAGE = '__vown-session__'
const AUTH_TOKEN = '__vown-session-token__'

const _setSession = async (data: IUserDetails | null) => localforage.setItem(AUTH_STORAGE, data)
const _setToken = async (token: string) => localforage.setItem(AUTH_TOKEN, token)

const _deleteSession = async () => localforage.removeItem(AUTH_STORAGE)
const _deleteToken = async () => localforage.removeItem(AUTH_TOKEN)

const _getPersonalDetails = async (): Promise<IUserDetails | null> => {
  const user = app.auth().currentUser

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

const _getToken = async (token_id: string) => {
  const res = await fetch(
    'https://us-central1-veriown-reviews.cloudfunctions.net/api/sessions/v1/token',
    { method: 'POST', body: JSON.stringify({ uid: token_id }) }
  )
  return res.json()
}

const SignIn = async (username: string, password: string) => {
  await app.auth().signInWithEmailAndPassword(username, password)
  const details = await _getPersonalDetails()
  if (details) {
    const token = await _getToken(details.token_id)
    await _setToken(token.token)
    await _setSession(details)
  }
  return await _getPersonalDetails()
}

const SignUp = async (username: string, password: string) => {
  await app.auth().createUserWithEmailAndPassword(username, password)
  const details = await _getPersonalDetails()
  if (details) {
    const token = await _getToken(details.token_id)
    await _setToken(token.token)
    await _setSession(details)
  }
  return await _getPersonalDetails()
}

const SignOut = async () => {
  await _deleteSession()
  await _deleteToken()
  app.auth().signOut()
}

const isLoggedIn = async () => !!app.auth().currentUser

const GetId = async () => {
  const user = app.auth().currentUser
  if (user) return user.uid
  return null
}

const GetPersonalDetails = async (): Promise<IUserDetails | null> =>
  await localforage.getItem(AUTH_STORAGE)

const GetToken = async (): Promise<string | null> => await localforage.getItem(AUTH_TOKEN)

export default {
  SignIn,
  SignUp,
  SignOut,
  isLoggedIn,
  GetPersonalDetails,
  GetId,
  GetToken,
}
