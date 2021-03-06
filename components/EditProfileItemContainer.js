import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
} from 'react-native'

const EditProfileItemContainer = ({label, children}) => {
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
        borderBottomColor: 'grey',
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
        color: 'blue',
        fontSize: 16,
    },
})

export default EditProfileItemContainer