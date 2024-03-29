import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

let app: firebase.app.App

if (!firebase.apps.length) {
  app = firebase.initializeApp(
    {
      apiKey: 'AIzaSyARkIZDrZNFCSYd6At-tOmy8pLBY3EN3ng',
      authDomain: 'veriown-reviews.firebaseapp.com',
      databaseURL: 'https://veriown-reviews.firebaseio.com',
      projectId: 'veriown-reviews',
      storageBucket: 'veriown-reviews.appspot.com',
      messagingSenderId: '769049122151',
      appId: '1:769049122151:web:46fcf538595daaa2',
    },
    'AuthApp'
  )
} else {
  app = firebase.app('AuthApp')
}

export default app
