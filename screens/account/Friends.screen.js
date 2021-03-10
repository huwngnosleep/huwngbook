import React from 'react'
import { 
    StyleSheet, 
    View, 
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'

import FriendCard from '../../components/User/FriendCard'

import DeviceDimensions from '../../constants/DeviceDimensions'

const FriendsScreen = ({navigation}) => {
    const friends = useSelector((state) => state.user.currentUser.friends)
    
    return(
        <View style={styles.screen}>
            <FlatList 
                contentContainerStyle={styles.list}
                numColumns={2}
                data={friends}
                renderItem={(itemData) => 
                    <FriendCard 
                        navigation={navigation}
                        friendId={itemData.item}
                        key={itemData.item}
                        style={styles.friendCard}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    list: {
        alignSelf: 'center',
        flex: 1,
    },
    friendCard: {
        width: DeviceDimensions.deviceWidth / 3,
        height: DeviceDimensions.deviceWidth / 3,
    },
})

export default FriendsScreen