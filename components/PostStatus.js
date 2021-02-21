import React from 'react'
import { 
    StyleSheet, 
    View, 
} from 'react-native'
import Avatar from './Avatar'
import CustomInput from './CustomInput'
import DeviceDimensions from '../constants/DeviceDimensions'


const PostStatus = (props) => {
    return(
        <View style={styles.statusContainer}>
            <Avatar style={styles.avatar} />
            <CustomInput 
                placeholder="What's on your mind?"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    statusContainer: {
        width: '90%',
        height: DeviceDimensions.deviceHeight / 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },

})

export default PostStatus