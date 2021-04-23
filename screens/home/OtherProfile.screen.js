import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    ScrollView,
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
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'
import ProfileSummary from '../../components/User/ProfileSummary'
import { Divider } from 'react-native-elements';
import Style from '../../constants/Style'

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
                title: `${fetchedData.name}`
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
        <CustomKeyboardAvoidView>
            <ScrollView style={styles.screen} >
                <ProfileSummary 
                    name={user.name}
                    bio={user.bio}
                    avatarUri={user.avatar}
                    coverImageUri={user.coverImage}
                />
                <View style={styles.detail}>
                    <View style={styles.detailItem}>
                        <ProfileDetail iconName="person" title="@" content={user.userName}/>
                        <ProfileDetail iconName="navigate-circle" title="Lives in: " content={user.address}/>
                        <ProfileDetail iconName="wine" title="Birth Day: " content={user.birthday}/>
                        <ProfileDetail iconName="call" title="Phone number: " content={user.phoneNumber}/>
                        <ProfileDetail iconName="mail" title="Email: " content={user.email}/>
                    </View>
                </View>

                <Divider style={Style.dividerStyle}/>

                <View style={styles.container}>
                    <View style={styles.textSummary}>
                        <Text style={styles.title}>Post</Text>
                    </View>
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
        </CustomKeyboardAvoidView>
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
        marginBottom: 20,
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
