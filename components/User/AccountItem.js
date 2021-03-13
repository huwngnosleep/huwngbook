import React from 'react'
import { 
    StyleSheet, 
    View, 
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from '../../constants/AppColors';
import ActionButton from '../UI/ActionButton';

export default function AccountItem ({onPress, iconName, action, haveRightArrow}) {
    return(
        <View style={styles.container} activeOpacity={1}>
            <ActionButton 
                onPress={onPress}
                iconName={iconName} 
                action={action}
            />
            {haveRightArrow ? <Icon 
                name="chevron-down"
                color={AppColors.mainBlack}
                size={25}
            /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
})
