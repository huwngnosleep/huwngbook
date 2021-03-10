import React, { useState, useEffect, useCallback } from 'react'
import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import DeviceDimensions from '../constants/DeviceDimensions';
import ActionButton from './ActionButton';
import CustomImage from './CustomImage';
import InfoBar from './InfoBar';

import { deletePost } from '../store/actions/user/post.actions'
import { useDispatch, useSelector } from 'react-redux';
import DatabaseUrl from '../constants/DatabaseUrl';

const PostDropdownMenu = ({ currentPostData, navigation, localId, editable }) => {
    
    const dispatch = useDispatch()
    if(editable === true) {
        return(
            <View
                style={styles.postDropdownMenu}
            >
                <ActionButton 
                    style={styles.dropdownButton} 
                    iconName="pencil" 
                    action="Edit"
                    onPress={() => {navigation.navigate('Edit Post', {currentPostData})}}
                />
                <ActionButton 
                    style={styles.dropdownButton} 
                    iconName="trash" 
                    action="Delete"
                    onPress={() => {
                        Alert.alert(
                            'Wait!!!',
                            'Are you sure?',
                            [
                                {
                                    text: 'Cancel',
                                },{
                                    text: 'Delete', 
                                    style: 'destructive',
                                    onPress: () => {dispatch(deletePost(localId, currentPostData.id))}
                                }
                            ]
                        )
                    }}
                />
            </View>
        )
    }
    return(
        <View
                style={styles.postDropdownMenu}
            >
                <ActionButton 
                    style={styles.dropdownButton} 
                    iconName="bookmark" 
                    action="Save"
                    onPress={() => {}}
                />
            </View>
    )
}

const Post = ({navigation, localId, postData, editable, disableNavigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const [postOwnerData, setPostOwnerData] = useState({})

    const fetchOwnerData = useCallback(async () => {
        try {
            const response = await fetch(`${DatabaseUrl}/users/${postData.ownerId}.json`)
            const resData = await response.json()
            for(const key in resData) {
                postOwnerData[key] = resData[key]
            }
        } catch (error) {
            setError(error.message)
        }
    }, [setPostOwnerData, setError])

    useEffect(() => {
        setIsLoading(true)
        fetchOwnerData().then(() => {
            setIsLoading(false)
        })
    }, [setError, fetchOwnerData])

    if (error) {
        return null
    }

    if (isLoading) {
        return null
    }

    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                {isDropdownVisible ? 
                    <PostDropdownMenu 
                        // passing currentPostData for editing later
                        editable={editable}
                        currentPostData={{...postData}}
                        navigation={navigation} 
                        localId={localId} 
                    /> 
                    : 
                    null
                }
                <InfoBar 
                    // pass ownerId to render Owner Profile Screen
                    onPress={
                        disableNavigation === true ?
                            () => {}
                            :
                            () => navigation.navigate('Other Profile', {
                                userId: postData.ownerId
                            })
                    }
                    imageUri={postOwnerData.avatar} 
                    mainText={postOwnerData.name} 
                    customText={postData.date}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {}}
                >
                    <Icon 
                        onPress={() => setDropdownVisible((prevState) => !prevState)}
                        name="ellipsis-horizontal"
                        color="#333"
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text>{postData.content}</Text>
            </View>
            <CustomImage imageUri={postData.imageUri}/>
            <View style={styles.actionsContainer}>
                <ActionButton style={styles.action} iconName="heart-outline" action="Like"/>
                <ActionButton style={styles.action} iconName="chatbox-ellipses-outline" action="Comment"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DeviceDimensions.deviceWidth * 0.9,
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    postDropdownMenu: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 20,
        right: 0,
    },
    dropdownButton: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        justifyContent: 'flex-start',
    },
    content: {
        paddingVertical: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        width: '50%',
    },
})

export default Post