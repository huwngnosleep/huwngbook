import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import AppColors from '../../constants/AppColors'
import DeviceDimensions from '../../constants/DeviceDimensions'
import CustomImage from '../UI/CustomImage'
import IconButton from '../UI/IconButton'
import Avatar from './Avatar'

export default function ProfileSummary ({
    avatarUri, 
    coverImageUri, 
    onAvatarPress = null, 
    onCoverImagePress = null, 
    name, 
    bio,
    style,
}) {
    
    return(
        <View style={{...styles.container, ...style}} >
            <View style={styles.imagesContainer}>
                <View>
                    {
                        coverImageUri ? 
                            <CustomImage 
                                style={styles.coverImage} 
                                imageUri={coverImageUri}>
                            </CustomImage>
                            :
                            <View
                                style={{...styles.coverImage, backgroundColor: AppColors.mainGreyBolder}}
                            ></View>
                    }
                    <IconButton 
                        onPress={onCoverImagePress} 
                        iconName="camera"
                        style={{position: 'absolute', bottom: 10, right: 10}} 
                    />
                </View>

                <View style={styles.avatarContainer}>
                    <Avatar 
                        style={styles.avatar}
                        imageUri={avatarUri}
                    />
                    <IconButton 
                        onPress={onAvatarPress}
                        iconName="camera"
                        style={{position: 'absolute', bottom: -0, right: 0}} 
                    />
                </View>
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
        overflow: 'hidden',
    },
    imagesContainer: {
        marginBottom: DeviceDimensions.deviceWidth / 6,
        alignSelf: 'center',
    },
    coverImage: {
        height: DeviceDimensions.deviceHeight / 4,
        width: DeviceDimensions.deviceWidth,
        maxWidth: '100%',
    },
    avatarContainer: {
        height: DeviceDimensions.deviceWidth / 3,
        width: DeviceDimensions.deviceWidth / 3,
        borderRadius:  DeviceDimensions.deviceWidth / 1.5,
        position: 'absolute',
        alignSelf: 'center',
        bottom: -DeviceDimensions.deviceWidth / 6,
        backgroundColor: AppColors.mainBlack,
    },
    avatar: {
        height: DeviceDimensions.deviceWidth / 3,
        width: DeviceDimensions.deviceWidth / 3,
        borderRadius:  DeviceDimensions.deviceWidth / 1.5,
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
