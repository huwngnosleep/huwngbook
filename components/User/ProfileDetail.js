import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'


export default function ProfileDetail ({title, content, iconName}) {
    return(
        <View style={styles.container} >
            <View style={styles.iconContainer}>
                <Icon 
                    style={styles.icon}
                    name={iconName}
                    color={AppColors.mainGreyBolder}
                    size={20}
                />
            </View>
            <Text style={styles.detail}>{title}{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    detail: {
        fontSize: 18,
        color: AppColors.mainGreyBolder,
    },
})
