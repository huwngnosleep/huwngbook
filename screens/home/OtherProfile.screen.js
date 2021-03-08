import React, { useCallback, useEffect, useState } from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    Button,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar'
import FriendCard from '../../components/FriendCard'
import ProfileDetail from '../../components/ProfileDetail'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'
import Icon from "react-native-vector-icons/Ionicons";

import DeviceDimensions from '../../constants/DeviceDimensions'
import DatabaseUrl from '../../constants/DatabaseUrl'
import PostModel from '../../models/post.model'

const OtherProfileScreen = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    const userId = route.params.userId

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${DatabaseUrl}/users/${userId}.json`)
            const resData = await response.json()
            for(const key in resData) {
                user[key] = resData[key]
            }
            navigation.setOptions({
                title: `${resData.name}'s Profile`
            })
        } catch (error) {
            setError(error.message)
        }
        for(const key in user.posts) {
            userPosts.unshift(new PostModel({
                id: user.posts[key].id,
                owner: user.posts[key].owner,
                ownerId: user.posts[key].ownerId,
                ownerAvatar: user.posts[key].ownerAvatar,
                date: user.posts[key].date,
                imageUri: user.posts[key].imageUri,
                content: user.posts[key].content
            }))
        }

    }, [setError])

    useEffect(() => {
        setIsLoading(true)
        fetchUserData().then(() => {
            setIsLoading(false)
        })
    }, [setIsLoading, fetchUserData])

    if (error) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <Button onPress={fetchUserData} title='Reload' />
        </View>
    }

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color="black" />
        </View>
    }

    return(
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
                    <ProfileDetail title="" content={user.userName}/>
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
                {userPosts.length > 0 ? null : <Text>This user currently has no post yet!</Text>}
                {userPosts.map((item) => 
                    <Post
                        disableNavigation={true}
                        key={item.id}
                        postData={item}
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
        borderBottomColor: 'grey',
    },
})

export default OtherProfileScreen