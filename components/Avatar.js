import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
} from 'react-native'

const Avatar = (props) => {
    return(
        <View style={styles.imageContainer}>
            <Image 
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default Avatar