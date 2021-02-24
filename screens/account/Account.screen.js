import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import AccountItem from '../../components/AccountItem'
import InfoBar from '../../components/InfoBar'
import DeviceDimensions from '../../constants/DeviceDimensions'
import Icon from "react-native-vector-icons/Ionicons";

const AccountScreen = (props) => {
    return(
        <View style={styles.screen} >
            <View style={styles.goToProfile}>
                <InfoBar mainText="User Name" customText="View your profile" onPress={() => {props.navigation.navigate('Profile')}}/>
                <Icon 
                    name="chevron-forward"
                    size={25}
                    color="#333"
                />
            </View>
            <View style={styles.actions}>
                <AccountItem iconName="flag" action="Pages"/>
                <AccountItem iconName="people" action="Groups"/>
                <AccountItem iconName="bookmarks" action="Saved"/>
                <AccountItem iconName="log-out" action="Sign out"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 10,
    },
    goToProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20,
    },
    actions: {
        alignItems: 'center',
    },
})

export default AccountScreen