import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import AccountItem from '../../components/AccountItem'
import InfoBar from '../../components/InfoBar'
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux';

const AccountScreen = (props) => {
    let userId = useSelector((state) => state.auth.userId)
    let user = useSelector((state) => state.auth.user)
    
    return(
        <View style={styles.screen} >
            <View style={styles.goToProfile}>
                <InfoBar mainText={user.name} customText="View your profile" onPress={() => {props.navigation.navigate('Profile')}}/>
                <Icon 
                    name="chevron-forward"
                    size={25}
                    color="#333"
                />
            </View>
            <View style={styles.actions}>
                <AccountItem 
                    haveRightArrow
                    iconName="flag" 
                    action="Pages"
                    onPress={() => {}}
                />
                <AccountItem 
                    haveRightArrow
                    iconName="people" 
                    action="Groups"
                    onPress={() => {}}
                />
                <AccountItem 
                    haveRightArrow
                    iconName="bookmarks" 
                    action="Saved" 
                    onPress={() => {}}
                />
                <AccountItem 
                    iconName={userId ? "log-out" : "log-in"}
                    action={userId ? "Sign out" : "Sign in"}
                    onPress={() => {
                        if(userId) {
                            () => {}
                        } else {
                            props.navigation.navigate('Authentication')
                        }
                    }}
                />
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