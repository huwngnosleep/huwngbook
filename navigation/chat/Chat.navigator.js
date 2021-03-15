import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatListScreen from '../../screens/chat/ChatList.screen'
import ChatScreen from '../../screens/chat/Chat.screen'

const Stack = createStackNavigator()

export default function ChatNavigator () {

    return(
        <Stack.Navigator>
            <Stack.Screen name="Chat List" component={ChatListScreen} />
            <Stack.Screen name="Chat Screen" component={ChatScreen} />
        </Stack.Navigator>
    )
}