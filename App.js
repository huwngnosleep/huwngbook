import 'react-native-gesture-handler'
import * as React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainNavigator from './navigation/main.navigator'

import * as firebase from 'firebase'
import { firebaseConfig } from './firebase.ultis'


export default function App() {
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return (
    <Provider store={store}> 
      <MainNavigator />
    </Provider>
  );
}