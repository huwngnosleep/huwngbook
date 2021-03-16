import * as firebase from 'firebase'
import 'firebase/firestore'

import ENV from './env'

const firebaseConfig = {
    apiKey: ENV.googleApiKey,
    authDomain: "huwngbook.firebaseapp.com",
    databaseURL: "https://huwngbook-default-rtdb.firebaseio.com",
    projectId: "huwngbook",
    storageBucket: "huwngbook.appspot.com",
    messagingSenderId: "571731341028",
    appId: "1:571731341028:web:34432af01464fe8bb046f1"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.database()
export const firestore = firebase.firestore()

