import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'

import AppColors from '../../constants/AppColors'

export default function EditProfileItemContainer ({label, children}) {
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.edit}>Edit</Text>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomColor: AppColors.mainGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 22,
    },
    edit: {
        color: AppColors.mainBlue,
        fontSize: 16,
    },
})
