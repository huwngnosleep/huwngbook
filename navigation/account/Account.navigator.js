import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../../screens/account/Account.screen';
import ProfileScreen from '../../screens/account/Profile.screen';
import FriendsScreen from '../../screens/account/Friends.screen';
import CreatePostScreen from '../../screens/home/CreatePost.screen';
import AuthScreen from '../../screens/account/Auth.screen';

const Stack = createStackNavigator()

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Authentication" component={AuthScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Create Post" component={CreatePostScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
        </Stack.Navigator>
    )
}

export default AccountNavigator