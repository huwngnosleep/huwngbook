import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
    Alert,
} from 'react-native'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/UI/CustomButton'

import InfoBar from '../../components/User/InfoBar'

import AppColors from '../../constants/AppColors'
import DatabaseUrl from '../../constants/DatabaseUrl'
import DeviceDimensions from '../../constants/DeviceDimensions'

const SearchResultScreen = ({route, navigation}) => {
    const { searchedData } = route.params
    console.log(searchedData)

    const localId = useSelector((state) => state.auth.localId)

    const addFriendHandler = async (localId, friendLocalId) => {
        try {
            const targetedUserCurrentPending = await (await fetch(`${DatabaseUrl}/users/${friendLocalId}/pendingFriendRequests.json`)).json() || []
            if(targetedUserCurrentPending.indexOf(localId) !== -1) {
                return Alert.alert(
                    'Your friend request to this user has been sent before!!!',
                    'Please wait for their response...'
                )
            }
            const targetedUserCurrentFriendList = await (await fetch(`${DatabaseUrl}/users/${friendLocalId}/friends.json`)).json() || []
            if(targetedUserCurrentFriendList.indexOf(localId) !== -1) {
                return Alert.alert(
                    'You are friends already!'
                )
            }
            await fetch(`${DatabaseUrl}/users/${friendLocalId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pendingFriendRequests: targetedUserCurrentPending ? 
                        targetedUserCurrentPending.concat(localId)
                        :
                        [localId]
                })
            })
            
            Alert.alert(
                'Friend request sent!',
                '',
                [{text: 'Okay'}]
            )
        } catch (error) {
            Alert.alert(
                'An error occurred!!!',
                '',
                [{text: 'Okay'}]
            )
        }
    }
    
    if(searchedData.length === 0) {
        return <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Text>Can't find any matched user!!!</Text>
        </View>
    }

    return(
        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={searchedData}
                keyExtractor={(item) => item.localId}
                renderItem={(itemData) =>
                    <View style={styles.listItem}>
                        <InfoBar 
                            onPress={() => {navigation.navigate('Other Profile', {
                                userId: itemData.item.localId
                            })}}
                            imageUri={itemData.item.avatar}
                            mainText={itemData.item.name}
                            customText={itemData.item.userName}
                        />
                        <CustomButton 
                            title="Add"
                            style={styles.addButton}
                            onPress={() => {
                                addFriendHandler(localId, itemData.item.localId)
                            }}
                        />
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    list: {
        marginTop: 20,
        width: DeviceDimensions.deviceWidth,
        alignSelf: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: DeviceDimensions.deviceWidth * 0.8,        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: AppColors.mainGrey,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 20,
    },
    addButton: {
        paddingHorizontal: 7,
    },
})

export default SearchResultScreen