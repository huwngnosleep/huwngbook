import 'react-native-gesture-handler'
import * as React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainNavigator from './navigation/main.navigator'
import * as firebase from 'firebase'
import ENV from './env'

export default function App() {
  const firebaseConfig = {
    apiKey: ENV.googleApiKey,
    projectId: 'huwngbook',
    storageBucket: 'huwngbook.appspot.com',
  };
  
  firebase.initializeApp(firebaseConfig);

  return (
    <Provider store={store}> 
      <MainNavigator />
    </Provider>
  );
}