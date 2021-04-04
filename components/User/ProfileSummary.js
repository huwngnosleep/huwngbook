import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import AppColors from '../../constants/AppColors'
import DeviceDimensions from '../../constants/DeviceDimensions'
import CustomImage from '../UI/CustomImage'
import Avatar from './Avatar'

export default function ProfileSummary ({
    avatarUri, 
    coverImageUri, 
    onAvatarPress = null, 
    onCoverImagePress = null, 
    name, 
    bio,
}) {
    
    return(
        <View style={styles.container} >
            <View style={styles.coverImageContainer}>
                {
                    coverImageUri ? 
                        <CustomImage 
                            onPress={onCoverImagePress} 
                            style={styles.coverImage} 
                            imageUri={coverImageUri}>
                        </CustomImage>
                        :
                        <View
                            style={{...styles.coverImage, backgroundColor: AppColors.mainGreyBolder}}
                        ></View>
                }
                <Avatar 
                    onPress={onAvatarPress}
                    style={styles.avatar}
                    imageUri={avatarUri}
                />
            </View>
            <View style={styles.intro}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.bio}>{bio}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    coverImageContainer: {
        marginBottom: DeviceDimensions.deviceWidth / 6,
    },
    coverImage: {
        height: DeviceDimensions.deviceHeight / 4,
        width: DeviceDimensions.deviceWidth,
    },
    avatar: {
        height: DeviceDimensions.deviceWidth / 3,
        width: DeviceDimensions.deviceWidth / 3,
        borderRadius: DeviceDimensions.deviceWidth / 6,
        position: 'absolute',
        alignSelf: 'center',
        bottom: -DeviceDimensions.deviceWidth / 6,
    },
    intro: {
        marginVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
    },
})
