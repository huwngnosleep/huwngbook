import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import DeviceDimensions from '../constants/DeviceDimensions';


const ProfileDetail = (props) => {
    return(
        <View style={styles.container} >
            <View style={styles.iconContainer}>
                <Icon 
                    name="ios-add"
                    color="#333"
                    size={25}
                />
            </View>
            <Text styles={styles.detail}>Detailllllllllllllllllllllllllllllllllllllllllllllllll</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: DeviceDimensions.deviceWidth * 0.95,
        marginBottom: 5,
    },
    iconContainer: {
        width: '30%',
    },
    detail: {
        width: '70%',
        fontSize: 20,
    },
})

export default ProfileDetail