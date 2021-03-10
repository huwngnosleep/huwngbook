import React, { useState } from 'react'
import { 
    StyleSheet, 
    View,
    TouchableOpacity, 
    Text,

} from 'react-native'

const CustomButton = ({style, onPress, action}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.5}
            style={{...styles.container, ...style}} 
        >
            <Text style={styles.buttonText}>{action}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    buttonText: {

    },

})

export default CustomButton