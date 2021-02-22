import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    Button,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Avatar from '../../components/Avatar'
import FriendCard from '../../components/FriendCard'
import InfoDetail from '../../components/InfoDetail'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'
import DeviceDimensions from '../../constants/DeviceDimensions'

const ProfileScreen = (props) => {
    return(
        <ScrollView style={styles.screen} >
            <View>
                <Avatar style={styles.backgroundImg}/>
                <View style={styles.introContainer}>
                    <Avatar style={styles.avatar}/>
                    <View style={styles.intro}>
                        <Text style={styles.name}>Name</Text>
                        <Text style={styles.bio}>Biooooooooooo</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detail}>
                <InfoDetail/>
                <InfoDetail/>
                <InfoDetail/>
            </View>
            <View style={styles.container}>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Friends</Text>
                    <Text>xxx friends</Text>
                </View>
                <FlatList 
                    data={[1,2,3,4,5,6,7,8,9]}
                    renderItem={(itemData) => <FriendCard style={styles.friendCard} />}
                    numColumns={3}
                />
                <View style={styles.actions}>
                    <Button 
                        title="See all friends"
                        color="grey"
                        onPress={() => {props.navigation.navigate('Friends')}}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Post</Text>
                </View>
                <PostStatus />
            </View>
            <View style={styles.container}>
                {[1,2,3,4,5].map((itemData) => <Post />)}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
    },
    backgroundImg: {
        height: DeviceDimensions.deviceHeight / 5,
        width: DeviceDimensions.deviceWidth,
        borderRadius: 0,
    },
    introContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    avatar: {
        height: DeviceDimensions.deviceWidth / 4,
        width: DeviceDimensions.deviceWidth / 4,
        borderRadius: DeviceDimensions.deviceWidth / 8,
    },
    intro: {
        alignItems: 'center',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
    },
    container: {
        alignItems: 'center',
    },
    textSummary: {
        width: '90%',
        alignItems: 'flex-start',
    },
    friendCard: {
        width: DeviceDimensions.deviceWidth / 4,
        height: DeviceDimensions.deviceWidth / 4,
    },

    actions: {
        width: '80%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})

export default ProfileScreen