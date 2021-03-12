import React from 'react'
import { 
    StyleSheet, 
    View, 
    Image,
} from 'react-native'
import DeviceDimensions from '../../constants/DeviceDimensions'


const CustomImage = ({style, imageUri}) => {

    if(!imageUri) {
        return null
    }

    return(
        <View style={{...styles.imageContainer, ...style}}>
            <Image 
                source={{uri: imageUri}}
                style={styles.image}
            />
        </View>
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