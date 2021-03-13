import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'

import Avatar from '../../components/User/Avatar'
import ProfileDetail from '../../components/User/ProfileDetail'
import Post from '../../components/User/Post'
import Icon from "react-native-vector-icons/Ionicons";

import DeviceDimensions from '../../constants/DeviceDimensions'
import DatabaseUrl from '../../constants/DatabaseUrl'
import PostModel from '../../models/post.model'
import AppColors from '../../constants/AppColors'
import LoadingCircle from '../../components/UI/LoadingCircle'

export default function OtherProfileScreen ({navigation, route}) {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    const userId = route.params.userId

    const fetchUserData = useCallback(async () => {
        try {
            const fetchedData = await (await fetch(`${DatabaseUrl}/users/${userId}.json`)).json()
            
            const loadedUser = {}
            for(const key in fetchedData) {
                loadedUser[key] = fetchedData[key]
            }
            setUser(loadedUser)
            
            const loadedPosts = []
            for(const post in fetchedData.posts) {
                loadedPosts.unshift(new PostModel(fetchedData.posts[post]))
            }
            setUserPosts(loadedPosts)

            navigation.setOptions({
                title: `${resData.name}'s Profile`
            })
        } catch (error) {
            console.log(error)
        }


    }, [setUserPosts, setUser])

    useEffect(() => {
        setIsLoading(true)
        fetchUserData().then(() => {
            setIsLoading(false)
        })
    }, [setIsLoading, fetchUserData])

    if (isLoading) {
        return <LoadingCircle />
    }

    return(
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} >
            <ScrollView style={styles.screen} >
                <View>
                    <Avatar imageUri={user.coverImage} style={styles.backgroundImg}/>
                    <View style={styles.introContainer}>
                        <Avatar 
                            imageUri={user.avatar}
                            style={styles.avatar}
                            onPress={() => {}}
                        />
                        <View style={styles.intro}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailItem}>
                        <ProfileDetail title="@" content={user.userName}/>
                        <ProfileDetail title="Lives in: " content={user.address}/>
                        <ProfileDetail title="Birth Day: " content={user.birthday}/>
                        <ProfileDetail title="Phone number: " content={user.phoneNumber}/>
                        <ProfileDetail title="Email: " content={user.email}/>
                    </View>
                    <Icon
                        onPress={() => {}}
                        style={styles.editInfoIcon} 
                        name="chatbubble-ellipses-outline"
                        size={30}
                    />
                </View>
                <View style={styles.line}></View>
                <View style={styles.container}>
                    <View style={styles.textSummary}>
                        <Text style={styles.title}>Post</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {
                        userPosts.length > 0 ? 
                            userPosts.map((item) => 
                                <Post
                                    disableNavigation={true}
                                    key={item.postId}
                                    postData={item}
                                />
                            )
                            : 
                            <Text>This user currently has no post yet!</Text>
                    }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        
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
    detail: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    detailItem: {
        
    },
    editInfoIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
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
    line: {
        marginVertical: 20,
        alignSelf: 'center',
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.mainGrey,
    },
})
