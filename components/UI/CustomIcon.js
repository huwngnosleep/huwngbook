import React, {useState} from 'react'
import { 
    StyleSheet, 
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/Ionicons"
import TempDisableOnPressTime from '../../constants/TempDisableOnPressTime'

export default function CustomIcon ({name, color, size, onPress, activeOpacity, style}) {

    const [isActive, setIsActive] = useState(true)
    // temporarily disable the button for a while to decrease chance of getting bug
    const tempDisableButton = () => {
        setIsActive(false)
        return setTimeout(() => {
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
            activeOpacity={activeOpacity || 0.2}
            style={{...style}}
        >
            <Icon 
                name={name}
                color={color}
                size={size}
            />
        </TouchableOpacity>
    )
}
