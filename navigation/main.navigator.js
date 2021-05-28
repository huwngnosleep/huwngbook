import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'

import HomeNavigator from './home/Home.navigator'
import AccountNavigator from './account/Account.navigator'
import ChatNavigator from './chat/Chat.navigator'
import GameNavigator from '../Navigator/Main'

const Tab = createBottomTabNavigator()

export default function MainNavigator () {
    
    const localId = useSelector((state) => state.auth.localId)

    if(localId === null) {
        return(
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Account" 
                        component={AccountNavigator} 
                        options={() => ({
                            tabBarLabel: 'Profile',
                            tabBarIcon: () => {
                                return(
                                    <Icon
                                        size={25}
                                        name='person' >
                                    </Icon>
                                )
                            },
                        })}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }

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
                    name="Chat" 
                    component={ChatNavigator} 
                    options={() => ({
                        tabBarLabel: 'Chat',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                            return(
                                <Icon
                                    size={25}
                                    name={iconName} >
                                </Icon>
                            )
                        },
                    })}
                />
                <Tab.Screen 
                    name="Game" 
                    component={GameNavigator} 
                    options={() => ({
                        tabBarLabel: 'Game',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'game-controller' : 'game-controller-outline'
                            return(
                                <Icon
                                    size={25}
                                    name={iconName} >
                                </Icon>
                            )
                        },
                    })}
                />
                <Tab.Screen 
                    name="Account" 
                    component={AccountNavigator} 
                    options={() => ({
                        tabBarLabel: 'Profile',
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


