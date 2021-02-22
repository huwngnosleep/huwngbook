import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeNavigator from './home/Home.navigator'
import AccountNavigator from './account/Account.navigator';

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={HomeNavigator} 
                />
                <Tab.Screen 
                    name="Account" 
                    component={AccountNavigator} 
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}


export default MainNavigator