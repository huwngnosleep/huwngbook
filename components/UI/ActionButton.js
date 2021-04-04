import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'
import TempDisableOnPressTime from '../../constants/TempDisableOnPressTime'

export default function ActionButton ({style, onPress, iconName, action, activeOpacity, notNeedDisable}) {
    if(notNeedDisable) {
        return(
            <TouchableOpacity 
                onPress={onPress}
                activeOpacity={activeOpacity || 0.2}
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
    
    const [active, setActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = useCallback(() => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, TempDisableOnPressTime)
    }, [setActive])

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
            activeOpacity={activeOpacity || 0.2}
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

