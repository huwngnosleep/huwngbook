import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import AccountItem from '../../components/AccountItem'
import InfoBar from '../../components/InfoBar'
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/actions/auth.actions'
import { signUserOut } from '../../store/actions/user.actions'

const AccountScreen = (props) => {
    const localId = useSelector((state) => state.auth.localId)
    const user = useSelector((state) => state.user.currentUser)
    
    const dispatch = useDispatch()

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
                    iconName={localId ? "log-out" : "log-in"}
                    action={localId ? "Sign out" : "Sign in"}
                    onPress={() => {
                        if(localId) {
                            dispatch(signOut())
                            dispatch(signUserOut())
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