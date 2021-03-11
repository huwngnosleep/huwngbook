import React from 'react'
import { 
    StyleSheet, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'

const ActionButton = ({style, onPress, iconName, action}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={{...styles.container, ...style}} 
        >
            <Icon 
                style={styles.actionItem}
                name={iconName}
                color={AppColors.mainGreyBolder}
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
        fontWeight: '200',
    },
})

export default ActionButton