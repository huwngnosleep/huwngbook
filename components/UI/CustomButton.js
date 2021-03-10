import React, { useState } from 'react'
import { 
    StyleSheet, 
    View,
    TouchableOpacity, 
    Text,
    ActivityIndicator,
} from 'react-native'
import AppColors from '../../constants/AppColors'

const CustomButton = ({style, onPress, title, color}) => {
    const [active, setActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = () => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, 3000);
    }

    // set style here to use color props more easily
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



export default CustomButton