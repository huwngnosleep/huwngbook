import React, { useEffect, useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'

import Avatar from '../../components/User/Avatar'
import FriendCard from '../../components/User/FriendCard'
import ProfileDetail from '../../components/User/ProfileDetail'
import Post from '../../components/User/Post'
import PostCreator from '../../components/User/PostCreator'

import Icon from "react-native-vector-icons/Ionicons"
import DeviceDimensions from '../../constants/DeviceDimensions'
import AppColors from '../../constants/AppColors'
import CustomButton from '../../components/UI/CustomButton'
import DatabaseUrl from '../../constants/DatabaseUrl'
import PostModel from '../../models/post.model'
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'
import ProfileSummary from '../../components/User/ProfileSummary'

export default function ProfileScreen ({navigation}) {
    const currentUser = useSelector((state) => state.user.currentUser)

    const localId = useSelector((state) => state.auth.localId)
    const [currentUserPosts, setCurrentUserPosts] = useState([])

    const fetchPosts = useCallback(async () => {
        const postsData = await (await fetch(`${DatabaseUrl}/users/${localId}/posts.json`)).json()
        const loadedPost = []
        for(const post in postsData) {
            loadedPost.unshift(new PostModel(postsData[post]))
        }
        loadedPost.sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))
        setCurrentUserPosts(loadedPost)
    }, [setCurrentUserPosts])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    useEffect(() => {
        navigation.setOptions({
            title: 'Your Profile'
        })
        const focusSubs = navigation.addListener('focus', fetchPosts)
        return focusSubs
    })

    return(
        <CustomKeyboardAvoidView>
            <ScrollView style={styles.screen} >
                    <ProfileSummary 
                        name={currentUser.name}
                        bio={currentUser.bio}
                        avatarUri={currentUser.avatar}
                        coverImageUri={currentUser.coverImage}
                        onCoverImagePress={() => {navigation.navigate('Edit Image', {
                            imageType: 'coverImage',
                            currentUserImage: currentUser.coverImage,
                        })}}
                        onAvatarPress={() => {navigation.navigate('Edit Image', {
                            imageType: 'avatar',
                            currentUserImage: currentUser.avatar,
                        })}}
                    />
                    <View style={styles.detail}>
                        <View>
                            <ProfileDetail title="@" content={currentUser.userName}/>
                            <ProfileDetail title="Lives in: " content={currentUser.address}/>
                            <ProfileDetail title="Birth Day: " content={currentUser.birthday}/>
                            <ProfileDetail title="Phone number: " content={currentUser.phoneNumber}/>
                            <ProfileDetail title="Email: " content={currentUser.email}/>
                        </View>
                        <Icon
                            onPress={() => {
                                navigation.navigate('Edit Profile')
                            }}
                            style={styles.editInfoIcon} 
                            name="create-outline"
                            size={30}
                            />
                    </View>
                    <View style={styles.container}>
                        <PostCreator imageUri={currentUser.avatar} onPress={() => {navigation.navigate('Create Post')}}/>
                        <View style={styles.textSummary}>
                            <Text style={styles.title}>Friends</Text>
                            {currentUser.friends.length > 0 ? <Text>{currentUser.friends.length} friends</Text> : null}
                        </View>
                        <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            {
                                currentUser.friends.length > 0 ?
                                    [...currentUser.friends].splice(0, 3).map((item) => 
                                        <FriendCard 
                                            navigation={navigation}
                                            friendId={item}
                                            key={item}
                                            style={styles.friendCard}
                                        />
                                    )
                                    : 
                                    <Text>You have no friend yet!</Text>
                            }
                            
                        </View>
                        {
                            currentUser.friends.length > 0 ? 
                                <CustomButton 
                                    style={styles.actions}
                                    title="See all friends"
                                    color={AppColors.mainGreyBolder}
                                    onPress={() => {navigation.navigate('Friends')}}
                                />
                                :
                                null
                        }
                        
                    </View>
                    <View style={styles.container}>
                        <View style={styles.textSummary}>
                            <Text style={styles.title}>Post</Text>
                        </View>
                        {
                            currentUserPosts.length > 0 ? 
                                currentUserPosts.map((post) => 
                                    <Post
                                        // editable props to make user just edit post in his profile screen
                                        editable={true}
                                        disableNavigation={true}
                                        navigation={navigation}
                                        key={post.postId}
                                        postData={post}
                                    />
                                )
                                : 
                                <Text>Create your first post!</Text>
                        }
                    </View>
            </ScrollView>
        </CustomKeyboardAvoidView>
    )
}

const styles = StyleSheet.create({
    screen: {
            
    },
    
    detail: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    editInfoIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
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
        width: '90%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})

