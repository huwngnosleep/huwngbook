import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

const AccountScreen = (props) => {
    return(
        <View style={styles.screen} >
            <Text>Account</Text>
            <Button title="Profile" onPress={() => {props.navigation.navigate('Profile')}} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
})

export default AccountScreen