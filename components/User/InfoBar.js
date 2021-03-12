import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Avatar from './Avatar'

import DeviceDimensions from '../../constants/DeviceDimensions'

const InfoBar = ({onPress, style, mainText, customText, imageUri, children}) => {
    
    return(
        <TouchableOpacity onPress={onPress} style={{...styles.container, ...style}}>
            <Avatar imageUri={imageUri} />
            <View>
                <Text numberOfLines={1} style={styles.mainText}>{mainText}</Text>
                <Text style={styles.customText}>{customText}</Text>
                {children ? children : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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