import * as firebase from 'firebase'
import 'firebase/firestore'

import ENV from './env'

const firebaseConfig = {
    apiKey: ENV.googleApiKey,
    authDomain: "huwngbookkk.firebaseapp.com",
    projectId: "huwngbookkk",
    storageBucket: "huwngbookkk.appspot.com",
    messagingSenderId: "351823757538",
    appId: "1:351823757538:web:98717c58339afe75d85ebb",
    measurementId: "G-LGWKKMM8RM"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const firestore = firebase.firestore()

