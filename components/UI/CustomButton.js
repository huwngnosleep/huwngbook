import React, { useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View,
    TouchableOpacity, 
    Text,
    ActivityIndicator,
} from 'react-native'
import AppColors from '../../constants/AppColors'

export default function CustomButton ({style, onPress, title, color, notNeedDisable}) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color ? color : AppColors.mainBlue,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            borderRadius: 5,
        },
        buttonText: {
            color: AppColors.mainWhite,
        },
    })
    
    if(notNeedDisable) {
        return(
            <TouchableOpacity 
                onPress={onPress}
                activeOpacity={0.5}
                style={{...styles.container, ...style}} 
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    const [active, setActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = useCallback(() => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, 3000)
    }, [setActive])

    // set style here to use color props more easily

    if(!active) {
        return(
            <View style={{...styles.container, ...style}} >
                <ActivityIndicator size='small' color={AppColors.mainWhite}/>
            </View>
        )
    }


    return(
        <TouchableOpacity 
            onPress={() => {
                tempDisableButton()
                onPress()
            }}
            activeOpacity={0.5}
            style={{...styles.container, ...style}} 
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}
