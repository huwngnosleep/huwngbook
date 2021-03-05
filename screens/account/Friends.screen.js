import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'
import FriendCard from '../../components/FriendCard'
import DeviceDimensions from '../../constants/DeviceDimensions'

const FriendsScreen = () => {
    const friends = useSelector((state) => state.user.currentUser.friends)
    
    return(
        <View style={styles.screen}>
            <FlatList 
                contentContainerStyle={styles.list}
                numColumns={2}
                data={friends}
                renderItem={(dataItem) => <FriendCard style={styles.friendCard}/>}
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