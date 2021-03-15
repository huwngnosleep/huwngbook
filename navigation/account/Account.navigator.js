import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AccountScreen from '../../screens/account/Account.screen'
import ProfileScreen from '../../screens/account/Profile.screen'
import FriendsScreen from '../../screens/account/Friends.screen'
import CreatePostScreen from '../../screens/home/CreatePost.screen'
import AuthScreen from '../../screens/account/Auth.screen'
import CreateUserScreen from '../../screens/account/CreateUser.screen'
import EditProfileScreen from '../../screens/account/EditProfile.screen'
import EditImageScreen from '../../screens/account/EditImage.screen'
import EditPostScreen from '../../screens/home/EditPost.screen'

import { useSelector } from 'react-redux'
import OtherProfileScreen from '../../screens/home/OtherProfile.screen'

const Stack = createStackNavigator()

export default function AccountNavigator () {
    const localId = useSelector((state) => state.auth.localId)

    return (
        <Stack.Navigator>
            {localId === null ? <Stack.Screen name="Authentication" component={AuthScreen} /> : null}
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Create User" component={CreateUserScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen name="Create Post" component={CreatePostScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Other Profile" component={OtherProfileScreen} />
            <Stack.Screen name="Edit Post" component={EditPostScreen} />
            <Stack.Screen name="Edit Image" component={EditImageScreen} />
        </Stack.Navigator>
    )
}
