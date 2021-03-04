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

import Avatar from '../../components/Avatar'
import FriendCard from '../../components/FriendCard'
import ProfileDetail from '../../components/ProfileDetail'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'
import Icon from "react-native-vector-icons/Ionicons";

import DeviceDimensions from '../../constants/DeviceDimensions'

const ProfileScreen = ({navigation}) => {
    const user = useSelector((state) => state.user.currentUser)
    const localId = useSelector((state) => state.auth.localId)

    return(
        <ScrollView style={styles.screen} >
            <View>
                <Avatar style={styles.backgroundImg}/>
                <View style={styles.introContainer}>
                    <Avatar 
                        style={styles.avatar}
                        onPress={() => {navigation.navigate('Edit Image')}}
                    />
                    <View style={styles.intro}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.bio}>{user.bio}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detail}>
                <View style={styles.detailItem}>
                    <ProfileDetail title="" content={user.userName}/>
                    <ProfileDetail title="Lives in: " content={user.address}/>
                    <ProfileDetail title="Birth Day: " content={user.birthday}/>
                    <ProfileDetail title="Phone number: " content={user.phoneNumber}/>
                    <ProfileDetail title="Email: " content={user.email}/>
                </View>
                <View style={styles.detailItem}>
                    <Icon
                        onPress={() => {
                            navigation.navigate('Edit Profile')
                        }}
                        style={styles.editInfoIcon} 
                        name="create-outline"
                        size={30}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Friends</Text>
                    {user.friends && user.friends.length > 0 ? <Text>{user.friends.length} friends</Text> : null}
                </View>
                {user.friends && user.friends.length > 0?
                    <FlatList 
                        data={user.friends}
                        renderItem={(itemData) => <FriendCard style={styles.friendCard} />}
                        numColumns={3}
                    />
                    : 
                    <Text>You have no friend yet!</Text>}
                <View style={styles.actions}>
                    <Button 
                        title="See all friends"
                        color="grey"
                        onPress={() => {navigation.navigate('Friends')}}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <PostStatus onPress={() => {navigation.navigate('Create Post')}}/>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Post</Text>
                </View>
            </View>
            <View style={styles.container}>
                {user.posts && user.posts.length > 0 ? null : <Text>Create your first post!</Text>}
                {user.posts && user.posts.map((item) => 
                    <Post
                        localId={localId}
                        postId={item.id}
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
    detail: {
        width: '90%',
        alignSelf: 'center',
    },
    editInfoIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
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
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
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