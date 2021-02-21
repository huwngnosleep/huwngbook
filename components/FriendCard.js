import React from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
} from 'react-native'

const FriendCard = (props) => {
    return(
        <View style={{...styles.container, ...props.style}} >
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: 'https://via.placeholder.com/150'}}
                    style={styles.image}
                />
            </View>
            <View style={styles.nameContainer}>
                <Text>Friend's name</Text>
            </View>
        </View>
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