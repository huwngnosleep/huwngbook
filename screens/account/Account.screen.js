import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const AccountScreen = (props) => {
    return(
        <View style={styles.screen} >
            <Text>Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
})

export default AccountScreen