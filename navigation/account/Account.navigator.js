import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../../screens/account/Account.screen';
import ProfileScreen from '../../screens/account/Profile.screen';
import FriendsScreen from '../../screens/account/Friends.screen';
import CreatePostScreen from '../../screens/home/CreatePost.screen';
import AuthScreen from '../../screens/account/Auth.screen';
import CreateUserScreen from '../../screens/account/CreateUser.screen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator()

const AccountNavigator = () => {
    const localId = useSelector((state) => state.auth.localId)
    // localId !== null => current user is not guess => can not access to auth screen

    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreen} />
            {localId === null ? <Stack.Screen name="Authentication" component={AuthScreen} /> : null}
            <Stack.Screen name="Create User" component={CreateUserScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Create Post" component={CreatePostScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
        </Stack.Navigator>
    )
}

export default AccountNavigator