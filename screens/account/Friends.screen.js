import React from 'react'
import { 
    StyleSheet, 
    View, 
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'

import FriendCard from '../../components/User/FriendCard'

import DeviceDimensions from '../../constants/DeviceDimensions'

export default function FriendsScreen ({navigation}) {
    const friends = useSelector((state) => state.user.currentUser.friends)
    
    return(
        <View style={styles.screen}>
            <FlatList 
                contentContainerStyle={styles.list}
                numColumns={2}
                data={friends}
                keyExtractor={(item) => item}
                renderItem={(itemData) => 
                    <FriendCard 
                        navigation={navigation}
                        friendId={itemData.item}
                        style={styles.friendCard}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        marginTop: 20,
        alignSelf: 'center',
        flex: 1,
    },
    friendCard: {
        width: DeviceDimensions.deviceWidth / 2.75,
        height: DeviceDimensions.deviceWidth / 2.75,
    },
})

