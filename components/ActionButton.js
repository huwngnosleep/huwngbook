import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

const ActionButton = (props) => {
    return(
        <TouchableOpacity 
            onPress={() => {}}
            activeOpacity={0.2}    
            style={{...styles.container, ...props.style}} 
        >
            <Icon 
                style={styles.actionItem}
                name={props.iconName}
                color="#333"
                size={25}
            />
            <Text style={styles.actionItem}>{props.action}</Text>
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