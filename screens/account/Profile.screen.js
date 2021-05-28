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
import { Divider } from 'react-native-elements';
import Style from '../../constants/Style'


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
                        style={styles.profileSummary}
                    />
                    
                    <Divider style={Style.dividerStyle}/>
                    
                    <View style={styles.container}>
                        <ProfileDetail iconName="person" title="@" content={currentUser.userName}/>
                        <ProfileDetail iconName="navigate-circle" title="Lives in: " content={currentUser.address}/>
                        <ProfileDetail iconName="wine" title="Birth Day: " content={currentUser.birthday}/>
                        <ProfileDetail iconName="call" title="Phone number: " content={currentUser.phoneNumber}/>
                        <ProfileDetail iconName="mail" title="Email: " content={currentUser.email}/>

                        <CustomButton 
                            title="Edit Public Details"
                            style={styles.actions}
                            color={AppColors.mainGreyBolder}
                            onPress={() => {
                                navigation.navigate('Edit Profile')
                            }}
                        />
                    </View>

                    <PostCreator imageUri={currentUser.avatar} onPress={() => {navigation.navigate('Create Post')}}/>
                    
                    <Divider style={Style.dividerStyle}/>
                    
                    <View style={styles.container}>
                        
                        <View style={styles.textSummary}>
                            <Text style={styles.title}>Friends</Text>
                            {currentUser.friends.length > 0 ? <Text>{currentUser.friends.length} friends</Text> : null}
                        </View>
                        
                        <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            {currentUser.friends.length > 0 ?
                                // make new object to avoid mutating state object
                                [...currentUser.friends].splice(0, 3).map((item) => 
                                    <FriendCard 
                                        navigation={navigation}
                                        friendId={item}
                                        key={item}
                                        style={styles.friendCard}
                                    />
                                )
                                : 
                                <Text style={{textAlign: 'center'}}>You have no friend yet!</Text>}
                            
                        </View>
                        {currentUser.friends.length > 0 ? 
                            <CustomButton 
                                style={styles.actions}
                                title="See all friends"
                                color={AppColors.mainGreyBolder}
                                onPress={() => {navigation.navigate('Friends')}}
                            />
                            :
                            null}
                        
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
                                <Text style={{textAlign: 'center'}}>Create your first post!</Text>
                        }
                    </View>
            </ScrollView>
        </CustomKeyboardAvoidView>
    )
}

const styles = StyleSheet.create({
    screen: {
        
    },

    container: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
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
        width: '100%',
        marginVertical: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})

