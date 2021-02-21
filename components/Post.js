import React from 'react'
import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import DeviceDimensions from '../constants/DeviceDimensions';
import Avatar from './Avatar'

const Post = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.topRowLeft}>
                    <Avatar />
                    <View>
                        <Text>Name</Text>
                        <Text>Date</Text>
                    </View>
                </View>
                <Icon 
                    name="reorder-three-outline"
                    color="#333"
                    size={25}
                />
            </View>
            <View>
                <Text>abcabcabc</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: 'https://via.placeholder.com/150'}}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DeviceDimensions.deviceWidth * 0.9,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    topRowLeft: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    imageContainer: {
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default Post