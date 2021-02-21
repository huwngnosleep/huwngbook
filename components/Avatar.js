import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
} from 'react-native'

const Avatar = (props) => {
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