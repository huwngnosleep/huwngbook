import React from 'react'
import { 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Text,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

import Avatar from './Avatar'

import DeviceDimensions from '../../constants/DeviceDimensions'
import AppColors from '../../constants/AppColors'


export default function PostCreator ({onPress, imageUri}) {

    return(
        <TouchableOpacity 
            activeOpacity={0.5}
            style={styles.container}
            onPress={onPress}
        >
            <Avatar imageUri={imageUri} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>What's on your mind?</Text>
            </View>
            <Icon 
                name="chevron-forward"
                color={AppColors.mainBlack}
                size={30}
            />
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: DeviceDimensions.deviceHeight / 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.mainGrey,
        marginVertical: 15,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    textContainer: {
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: AppColors.mainGrey,
        borderRadius: 20,
    },
    text: {
        fontSize: 18,
        color: AppColors.mainGrey,
    },
})
