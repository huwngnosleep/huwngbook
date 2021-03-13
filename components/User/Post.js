import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
} from 'react-native'

import CustomImage from '../UI/CustomImage'
import InfoBar from './InfoBar'

import Icon from "react-native-vector-icons/Ionicons"
import DeviceDimensions from '../../constants/DeviceDimensions'
import DatabaseUrl from '../../constants/DatabaseUrl'
import AppColors from '../../constants/AppColors'
import PostActionsBar from './Post/PostActionsBar'
import PostDropdownMenu from './Post/PostDropdownMenu'

export default function Post ({navigation, postData, editable, disableNavigation}) {
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
        console.log(error)
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
                        postData={postData}
                        navigation={navigation} 
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
                        color={AppColors.mainBlack}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text>{postData.content}</Text>
            </View>
            <CustomImage imageUri={postData.imageUri}/>
            <PostActionsBar 
                navigation={navigation}
                postData={postData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DeviceDimensions.deviceWidth * 0.9,
        marginBottom: 20,
        borderBottomColor: AppColors.mainGrey,
        borderBottomWidth: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    content: {
        paddingVertical: 10,
    },
    
})
