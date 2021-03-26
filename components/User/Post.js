import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native'

import CustomImage from '../UI/CustomImage'
import InfoBar from './InfoBar'

import DeviceDimensions from '../../constants/DeviceDimensions'
import DatabaseUrl from '../../constants/DatabaseUrl'
import AppColors from '../../constants/AppColors'
import PostActionsBar from './Post/PostActionsBar'
import PostDropdownMenu from './Post/PostDropdownMenu'
import CustomIcon from '../UI/CustomIcon'

export default function Post ({navigation, postData, editable, disableNavigation}) {
    const [isLoading, setIsLoading] = useState(false)
    
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    
    const [postOwnerData, setPostOwnerData] = useState({})

    const fetchOwnerData = useCallback(async () => {
        try {
            const name = await (await fetch(`${DatabaseUrl}/users/${postData.ownerId}/name.json`)).json()
            const avatar = await (await fetch(`${DatabaseUrl}/users/${postData.ownerId}/avatar.json`)).json()
            
            setPostOwnerData({
                name,
                avatar,
            })

        } catch (error) {
            console.log(error)
        }
    }, [setPostOwnerData])

    useEffect(() => {
        setIsLoading(true)
        fetchOwnerData().then(() => {
            setIsLoading(false)
        })
    }, [setIsLoading, fetchOwnerData])

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
                    customText={`${postData.date.slice(0, 5)}, ${postData.date.slice(13)}`}
                />
                <CustomIcon 
                    onPress={() => setDropdownVisible((prevState) => !prevState)}
                    name="ellipsis-horizontal"
                    color={AppColors.mainBlack}
                    size={25}
                />
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
        paddingBottom: 10,
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
