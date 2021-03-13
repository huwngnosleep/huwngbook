import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/actions/auth/auth.actions'
import { signUserOut } from '../../store/actions/user/user.actions'

import AccountItem from '../../components/User/AccountItem'
import InfoBar from '../../components/User/InfoBar'

import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'

export default function AccountScreen ({navigation}) {
    const localId = useSelector((state) => state.auth.localId)
    const currentUser = useSelector((state) => state.user.currentUser)
    
    const dispatch = useDispatch()

    return(
        <View style={styles.screen} >
            <View style={styles.goToProfile}>
                <InfoBar imageUri={currentUser.avatar} mainText={currentUser.name} customText="View your profile" onPress={() => {navigation.navigate('Profile')}}/>
                <Icon 
                    name="chevron-forward"
                    size={25}
                    color={AppColors.mainBlack}
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
                            Alert.alert(
                                'Signed out!'
                            )
                        } else {
                            navigation.navigate('Authentication')
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
