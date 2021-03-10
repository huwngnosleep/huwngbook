import React, { useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    ScrollView,
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'

import Avatar from '../../components/User/Avatar'
import FriendCard from '../../components/User/FriendCard'
import ProfileDetail from '../../components/User/ProfileDetail'
import Post from '../../components/User/Post'
import PostStatus from '../../components/User/PostStatus'

import Icon from "react-native-vector-icons/Ionicons"
import DeviceDimensions from '../../constants/DeviceDimensions'
import AppColors from '../../constants/AppColors'
import CustomButton from '../../components/UI/CustomButton'

const ProfileScreen = ({navigation}) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const localId = useSelector((state) => state.auth.localId)

    useEffect(() => {
        return navigation.setOptions({
            title: 'Your Profile'
        })
    })

    return(
        <ScrollView style={styles.screen} >
            <View>
                <Avatar 
                    style={styles.backgroundImg}
                    imageUri={currentUser.coverImage}
                    onPress={() => {navigation.navigate('Edit Image', {
                        imageType: 'coverImage',
                        currentUserImage: currentUser.coverImage,
                    })}}
                />
                <View style={styles.introContainer}>
                    <Avatar 
                        imageUri={currentUser.avatar}
                        style={styles.avatar}
                        onPress={() => {navigation.navigate('Edit Image', {
                            imageType: 'avatar',
                            currentUserImage: currentUser.avatar,
                        })}}
                    />
                    <View style={styles.intro}>
                        <Text style={styles.name}>{currentUser.name}</Text>
                        <Text style={styles.bio}>{currentUser.bio}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detail}>
                <View>
                    <ProfileDetail title="" content={currentUser.userName}/>
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
                <PostStatus imageUri={currentUser.avatar} onPress={() => {navigation.navigate('Create Post')}}/>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Friends</Text>
                    {currentUser.friends && currentUser.friends.length > 0 ? <Text>{currentUser.friends.length} friends</Text> : null}
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        currentUser.friends && currentUser.friends.length > 0 ?
                            currentUser.friends.splice(0, 3).map((item) => 
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
                    currentUser.friends && currentUser.friends.length > 0 ? 
                        <View style={styles.actions}>
                            <CustomButton 
                                title="See all friends"
                                color={AppColors.mainGrey}
                                onPress={() => {navigation.navigate('Friends')}}
                            />
                        </View>
                        :
                        null
                }
            </View>
            <View style={styles.container}>
                <View style={styles.textSummary}>
                    <Text style={styles.title}>Post</Text>
                </View>
            </View>
            <View style={styles.container}>
                {currentUser.posts && currentUser.posts.length > 0 ? null : <Text>Create your first post!</Text>}
                {currentUser.posts.map((item) => 
                    <Post
                        // editable props to make user just edit post in his profile screen
                        editable={true}
                        disableNavigation={true}
                        navigation={navigation}
                        key={item.id}
                        localId={localId}
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