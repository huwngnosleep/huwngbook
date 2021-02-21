import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../../screens/account/Account.screen';

const Stack = createStackNavigator()

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AccountScreen} />
        </Stack.Navigator>
    )
}

export default AccountNavigator