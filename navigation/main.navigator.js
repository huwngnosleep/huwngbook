import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeNavigator from './home/Home.navigator'
import AccountNavigator from './account/Account.navigator'
import { useSelector } from 'react-redux'

import AuthScreen from '../screens/account/Auth.screen'
import CreateUserScreen from '../screens/account/CreateUser.screen';

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    
    const localId = useSelector((state) => state.auth.localId)

    return (
        <NavigationContainer>
            <Tab.Navigator>
                {localId === null ? null : <Tab.Screen 
                    name="Home" 
                    component={HomeNavigator} 
                />}
                <Tab.Screen 
                    name="Account" 
                    component={AccountNavigator} 
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}


export default MainNavigator