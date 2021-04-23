import React, {useState} from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'
import TempDisableOnPressTime from '../../constants/TempDisableOnPressTime'

export default function IconButton ({style, iconName, onPress, activeOpacity = 0.7}) {

    const [isActive, setIsActive] = useState(true)
    // temporarily disable the button for a while to decrease chance of getting bug
    const tempDisableButton = () => {
        setIsActive(false)
        setTimeout(() => {
           setIsActive(true) 
        }, TempDisableOnPressTime)
    }

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
            activeOpacity={activeOpacity}
            style={{...styles.container, ...style}}
        >
            <Icon 
                name={iconName}
                color={AppColors.mainBlack}
                size={20}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: AppColors.mainGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
