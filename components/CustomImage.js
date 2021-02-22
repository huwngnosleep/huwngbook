import React from 'react'
import { 
    StyleSheet, 
    View, 
    Image,
} from 'react-native'
import DeviceDimensions from '../constants/DeviceDimensions'


const CustomImage = (props) => {
    return(
        <View style={{...styles.imageContainer, ...props.style}}>
            <Image 
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
        width: '100%',
        maxHeight: DeviceDimensions.deviceHeight / 2,
        marginTop: 5,
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default CustomImage