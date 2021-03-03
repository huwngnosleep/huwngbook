import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux'

const Avatar = (props) => {
    const avatar = useSelector((state) => state.user.currentUser.avatar)

    return(
        <TouchableOpacity
            style={{...styles.imageContainer, ...props.style}}
            onPress={props.onPress}
            activeOpacity={0.7}
        >
            <Image 
                source={{uri: avatar}}
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