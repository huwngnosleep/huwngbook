import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
} from 'react-native'
import FriendCard from '../../components/FriendCard'
import DeviceDimensions from '../../constants/DeviceDimensions'

const FriendsScreen = (props) => {
    return(
        <View style={styles.screen}>
            <FlatList 
                styles={styles.list}
                numColumns={2}
                data={[1,2,3,4]}
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
        flex: 1,
    },
    friendCard: {
        width: DeviceDimensions.deviceWidth / 2,
        height: DeviceDimensions.deviceWidth / 2,
    },
})

export default FriendsScreen