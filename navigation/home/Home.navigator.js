import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home/Home.screen';
import CreatePostScreen from '../../screens/home/CreatePost.screen';

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create Post" component={CreatePostScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigator