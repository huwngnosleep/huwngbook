import React from 'react'
import { 
    StyleSheet, 
    View, 
    Image,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeviceDimensions from '../../constants/DeviceDimensions'


const CustomImage = ({style, imageUri, onPress = null}) => {

    if(!imageUri) {
        return null
    }

    return(
        <TouchableOpacity 
            activeOpacity={0.9}
            onPress={onPress}
            style={{...styles.imageContainer, ...style}}
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
        overflow: 'hidden',
        width: '100%',
        maxHeight: DeviceDimensions.deviceHeight * 0.6,
        marginTop: 10,
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default CustomImage