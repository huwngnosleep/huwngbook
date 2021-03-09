import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../components/Avatar'
import DatabaseUrl from '../../constants/DatabaseUrl'
import DeviceDimensions from '../../constants/DeviceDimensions'
import { friendRequestResponse } from '../../store/actions/user/user.actions'

const FriendRequestItem = ({onPress, ownerId, localId}) => {
    const dispatch = useDispatch()
    const [eachUserData, setEachUserData] = useState({})

    const fetchData = async () => {
        try {
            const name = await (await fetch(`${DatabaseUrl}/users/${ownerId}/name.json`)).json()
            const userName = await (await fetch(`${DatabaseUrl}/users/${ownerId}/userName.json`)).json()
            const avatar = await (await fetch(`${DatabaseUrl}/users/${ownerId}/avatar.json`)).json()
            setEachUserData({
                name,
                userName,
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
            <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{eachUserData.name}</Text>
                <Text style={{color: 'grey'}}>{eachUserData.userName}</Text>
                <View style={styles.actionsContainer}>
                    <Button 
                        title="Confirm"
                        onPress={() => {
                            dispatch(friendRequestResponse('confirmed', ownerId, localId))
                        }}
                    />
                    <Button 
                        title="Reject"
                        onPress={() => {
                            dispatch(friendRequestResponse('rejected', ownerId, localId))
                        }}
                    />
                </View>

            </View>
        </View>
    )
}

const FriendRequestScreen = ({navigation}) => {
    const requestsData = useSelector((state) => state.user.currentUser.pendingFriendRequests)
    const localId = useSelector((state) => state.user.currentUser.localId)

    if(requestsData.length === 0) {
        return <View style={{alignItems: 'center', flex: 1,}}>
            <Text style={{marginTop: 20}}>You have no friend request yet!</Text>
        </View>
    }

    return(
        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={requestsData}
                keyExtractor={(item) => item.localId}
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
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})

export default FriendRequestScreen