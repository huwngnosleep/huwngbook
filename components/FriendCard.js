import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'

const FriendCard = ({style}) => {
    return(
        <TouchableOpacity style={{...styles.container, ...style}} >
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: 'https://via.placeholder.com/150'}}
                    style={styles.image}
                />
            </View>
            <View style={styles.nameContainer}>
                <Text>Friend's name</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 150,
        maxWidth: 150,
        backgroundColor: 'white',
        margin: 10,
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: '80%',
        overflow: 'hidden',
        borderRadius: 5,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    nameContainer: {
        alignItems: 'center',
        height: '20%',
        width: '100%',
        backgroundColor: 'white',
    },

})

export default FriendCard