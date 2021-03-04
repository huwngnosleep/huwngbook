import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";


const ProfileDetail = ({title, content}) => {
    return(
        <View style={styles.container} >
            <View style={styles.iconContainer}>
                <Icon 
                    name="remove"
                    color="grey"
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
    iconContainer: {
    },
    detail: {
        fontSize: 18,
        color: 'grey',
    },
})

export default ProfileDetail