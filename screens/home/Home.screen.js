import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Avatar from '../../components/Avatar'
import CustomInput from '../../components/CustomInput'
import DeviceDimensions from '../../constants/DeviceDimensions'

const HomeScreen = (props) => {
    return(
        <View style={styles.screen} >
            <View style={styles.statusContainer}>
                <Avatar style={styles.avatar} />
                <CustomInput 
                    placeholder="What's on your mind?"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 10,
    },
    statusContainer: {
        width: '100%',
        height: DeviceDimensions.deviceHeight / 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default HomeScreen