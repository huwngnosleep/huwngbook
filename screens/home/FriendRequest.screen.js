import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { friendRequestResponse } from '../../store/actions/user/user.actions'

import Avatar from '../../components/User/Avatar'
import CustomButton from '../../components/UI/CustomButton'

import AppColors from '../../constants/AppColors'
import DatabaseUrl from '../../constants/DatabaseUrl'
import DeviceDimensions from '../../constants/DeviceDimensions'

const FriendRequestItem = ({onPress, ownerId, localId}) => {
    const dispatch = useDispatch()
    const [eachUserData, setEachUserData] = useState({})

    const fetchData = async () => {
        try {
            const name = await (await fetch(`${DatabaseUrl}/users/${ownerId}/name.json`)).json()
            const avatar = await (await fetch(`${DatabaseUrl}/users/${ownerId}/avatar.json`)).json()
            setEachUserData({
                name,
                avatar
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    })

    return(
        <View style={styles.listItem}>
            <Avatar onPress={onPress} imageUri={eachUserData.avatar} style={{height: 60, width: 60, borderRadius: 30, marginRight: 20,}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>{eachUserData.name}</Text>
                <View style={styles.actionsContainer}>
                    <CustomButton
                        title="Confirm"
                        style={styles.button}
                        onPress={() => {
                            dispatch(friendRequestResponse('confirmed', ownerId, localId))
                        }}
                    />
                    <CustomButton
                        title="Reject"
                        color={AppColors.mainGreyBolder}
                        style={styles.button}
                        onPress={() => {
                            dispatch(friendRequestResponse('rejected', ownerId, localId))
                        }}
                    />
                </View>

            </View>
        </View>
    )
}

export default function FriendRequestScreen ({navigation}) {
    const pendingFriendRequests = useSelector((state) => state.user.currentUser.pendingFriendRequests)
    const localId = useSelector((state) => state.user.currentUser.localId)

    if(pendingFriendRequests.length === 0) {
        return <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>You have no friend request yet!</Text>
        </View>
    }

    return(
        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={pendingFriendRequests}
                keyExtractor={(item) => item}
                renderItem={(itemData) => 
                    <FriendRequestItem 
                        onPress={() => {navigation.navigate('Other Profile', {
                            userId: itemData.item
                        })}}
                        localId={localId}
                        ownerId={itemData.item}
                    />
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
        alignItems: 'center',
        backgroundColor: AppColors.mainGrey,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        width: DeviceDimensions.deviceWidth / 5,
        paddingVertical: 3,
        borderRadius: 5,
        marginTop: 10,
    },
})
