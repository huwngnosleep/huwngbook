import React, { useEffect } from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    Button,
    FlatList,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as postActions from '../../store/actions/posts.actions'

import Avatar from '../../components/Avatar'
import FriendCard from '../../components/FriendCard'
import ProfileDetail from '../../components/ProfileDetail'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'

import DeviceDimensions from '../../constants/DeviceDimensions'

const ProfileScreen = (props) => {
    let user = useSelector((state) => state.user.currentUser)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(postActions.setPosts())
    }, [dispatch])

    return(
        <ScrollView style={styles.screen} >
            <View>
                <Avatar style={styles.backgroundImg}/>
                <View style={styles.introContainer}>
                    <Avatar style={styles.avatar}/>
                    <View style={styles.intro}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.bio}>{user.bio}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detail}>
                {user.detailInfo ? user.detailInfo.map((item) => <ProfileDetail content={item}/>) : null}
            </View>
            <View style={styles.container}>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Friends</Text>
                    {user.friends && user.friends.length > 0 ? <Text>{user.friends.length} friends</Text> : null}
                </View>
                {/* {user.friends && user.friends.length > 0?
                    <FlatList 
                        data={user.friends}
                        renderItem={(itemData) => <FriendCard style={styles.friendCard} />}
                        numColumns={3}
                    />
                    : 
                    <Text>You have no friend yet!</Text> */}
                <View style={styles.actions}>
                    <Button 
                        title="See all friends"
                        color="grey"
                        onPress={() => {props.navigation.navigate('Friends')}}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <PostStatus onPress={() => {props.navigation.navigate('Create Post')}}/>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Post</Text>
                </View>
            </View>
            <View style={styles.container}>
                {user.posts && user.posts.length > 0 ? null : <Text>Create your first post!</Text>}
                {user.posts && user.posts.map((item) => 
                    <Post
                        mainText={item.owner}
                        customText={item.date}
                        imageUri={item.imageUri}
                        content={item.content}
                    />
                )}
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
        marginVertical: 5,
        alignItems: 'center',
        width: DeviceDimensions.deviceWidth,
    },
    textSummary: {
        width: '90%',
        alignItems: 'flex-start',
        marginBottom: 10,
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