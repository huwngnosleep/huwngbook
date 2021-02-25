import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
} from 'react-native'
import { useSelector } from 'react-redux'

const Avatar = (props) => {
    const avatar = useSelector((state) => state.auth.user.avatar)

    return(
        <View style={{...styles.imageContainer, ...props.style}}>
            <Image 
                source={{uri: avatar}}
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