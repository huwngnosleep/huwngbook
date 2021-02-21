import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store/store';
import MainNavigator from './navigation/main.navigator';

export default function App() {
  return (
    <Provider store={store}> 
          <MainNavigator />
    </Provider>
  );
}