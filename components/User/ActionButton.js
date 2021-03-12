import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'

const ActionButton = ({style, onPress, iconName, action}) => {
    const [active, setActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = () => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, 3000)
    }

    return(
        <TouchableOpacity 
            onPress={active === true ? 
                () => {
                    onPress()
                    tempDisableButton()
                }
                : 
                () => {}
            }
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