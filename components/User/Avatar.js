import React from 'react'
import { 
    Image,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import DefaultProfileImagePlaceholder from '../../constants/DefaultProfileImagePlaceholder'

export default function Avatar ({style, onPress, imageUri = DefaultProfileImagePlaceholder}) {
    
    return(
        <TouchableOpacity
            style={{...styles.imageContainer, ...style}}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {
                imageUri !== '' ?
                    <Image 
                        source={{uri: imageUri}}
                        style={styles.image}
                    />
                    :
                    null
            }
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

