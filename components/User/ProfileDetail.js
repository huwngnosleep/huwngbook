import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'


const ProfileDetail = ({title, content}) => {
    return(
        <View style={styles.container} >
            <View style={styles.iconContainer}>
                <Icon 
                    name="remove"
                    color={AppColors.mainGreyBolder}
                    size={15}
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
    iconContainer: {
    },
    detail: {
        fontSize: 18,
        color: AppColors.mainGreyBolder,
    },
})

export default ProfileDetail