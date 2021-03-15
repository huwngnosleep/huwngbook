import * as firebase from 'firebase'
import 'firebase/firestore'

import ENV from './env'

export const firebaseConfig = {
    apiKey: ENV.googleApiKey,
    projectId: 'huwngbook',
    storageBucket: 'huwngbook.appspot.com',
    
}

export const firestore = firebase.firestore()

