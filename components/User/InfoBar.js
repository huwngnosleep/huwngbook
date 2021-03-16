import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Avatar from './Avatar'

import DeviceDimensions from '../../constants/DeviceDimensions'

export default function InfoBar ({onPress = () => {}, style, mainText, customText, imageUri, children}) {
    const [isActive, setIsActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = useCallback(() => {
        setIsActive(false)
        setTimeout(() => {
           setIsActive(true) 
        }, 3000)
    }, [setIsActive])
    
    return(
        <TouchableOpacity
            onPress={
                isActive ? 
                    () => {
                        tempDisableButton()
                        onPress()
                    }
                    :
                    () => {}
            } 
            style={{...styles.container, ...style}}
        >
            <Avatar imageUri={imageUri}/>
            <View>
                <Text numberOfLines={1} style={styles.mainText}>{mainText}</Text>
                <Text numberOfLines={1} style={styles.customText}>{customText}</Text>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: DeviceDimensions.deviceWidth > 400 ? 22 : 20,
    },
    customText: {
        fontSize: 12,
        fontWeight: '300',
    },
})

