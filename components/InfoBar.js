import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeviceDimensions from '../constants/DeviceDimensions'
import Avatar from './Avatar'

const InfoBar = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={{...styles.container, ...props.style}}>
            <Avatar />
            <View>
                <Text style={styles.mainText}>{props.mainText}</Text>
                <Text style={styles.customText}>{props.customText}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: DeviceDimensions.deviceWidth > 400 ? 20 : 18,
    },
    customText: {
        fontSize: 12,
        fontWeight: '300',
    },
})

export default InfoBar