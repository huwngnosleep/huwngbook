import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

const ActionButton = ({style, onPress, iconName, action}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.5}    
            style={{...styles.container, ...style}} 
        >
            <Icon 
                style={styles.actionItem}
                name={iconName}
                color="#333"
                size={25}
            />
            <Text style={styles.actionItem}>{action}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionItem: {
        marginHorizontal: 5,
        fontSize: 16,
    },
})

export default ActionButton