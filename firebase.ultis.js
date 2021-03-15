import * as firebase from 'firebase'
import 'firebase/firestore'

import ENV from './env'

export const firebaseConfig = {
    apiKey: ENV.googleApiKey,
    projectId: 'huwngbook',
    storageBucket: 'huwngbook.appspot.com',
    
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const firestore = firebase.firestore()

