import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import HomeNavigator from './home/Home.navigator'
import AccountNavigator from './account/Account.navigator'
import { useSelector } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    
    const localId = useSelector((state) => state.auth.localId)

    return (
        <NavigationContainer>
            <Tab.Navigator>
                {localId === null ? null : <Tab.Screen 
                    name="Home" 
                    component={HomeNavigator} 
                    options={() => ({
                        tabBarLabel: 'Home',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'newspaper' : 'newspaper-outline'

                            return(
                                <Icon
                                    size={25}
                                    name={iconName} >
                                </Icon>
                            )
                        },
                    })}
                />}
                <Tab.Screen 
                    name="Account" 
                    component={AccountNavigator} 
                    options={() => ({
                        tabBarLabel: 'Home',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'person' : 'person-outline'

                            return(
                                <Icon
                                    size={25}
                                    name={iconName} >
                                </Icon>
                            )
                        },
                    })}
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}


export default MainNavigator