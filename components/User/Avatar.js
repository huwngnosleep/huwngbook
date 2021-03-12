import React from 'react'
import { 
    Image,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import DefaultProfileImagePlaceholder from '../../constants/DefaultProfileImagePlaceholder'

const Avatar = ({style, onPress, imageUri = ''}) => {

    if(imageUri.length === 0) {
        imageUri = DefaultProfileImagePlaceholder
    }
    
    return(
        <TouchableOpacity
            style={{...styles.imageContainer, ...style}}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image 
                source={{uri: imageUri}}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default Avatar