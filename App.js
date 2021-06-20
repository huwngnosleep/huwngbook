import 'react-native-gesture-handler'
import * as React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainNavigator from './navigation/main.navigator'
import { useFonts } from 'expo-font'

export default function App() {
  const [loaded] = useFonts({
    Pixel: require('./Font/Pixel.ttf'),
    FlappyBird: require('./Font/FlappyBird.ttf')
  })

  if(!loaded) return null

  return (
    <Provider store={store}> 
      <MainNavigator />
    </Provider>
  );
}