import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'

const AlertText = ({style, alertText}) => {
    return(
        <View >
            <Text style={{...styles.alertText, ...style}}>{alertText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    alertText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
})

export default AlertText