import React, { useState } from 'react'
import { 
    StyleSheet, 
    View,
    ScrollView, 
    Text,
} from 'react-native'
import AlertText from '../../components/AlertText'
import CustomTextInput from '../../components/CustomTextInput'
import DeviceDimensions from '../../constants/DeviceDimensions'

const CreateUserScreen = (props) => {
    const [alertText, setAlertText] = useState(props.route.params.alertText)

    return(
        <View contentContainerStyle={styles.screen}>
            <ScrollView style={styles.container}>
                <AlertText alertText={alertText} />
                <CustomTextInput 
                    label="Full name" 
                    placeholder="Thanh Hung Nguyen"
                />
                <CustomTextInput 
                    label="User name" 
                    placeholder="@huwngnosleep"
                    autoCapitalize='none'
                />
                <CustomTextInput 
                    label="Birthday" 
                    placeholder="30/2/1999"
                    keyboardType="number-pad"
                />
                <CustomTextInput 
                    label="Phone number" 
                    placeholder="0123456789"
                    keyboardType="number-pad"
                />
                <CustomTextInput 
                    label="Gender" 
                    placeholder="Male"
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: DeviceDimensions.deviceWidth * 0.8,
        height: DeviceDimensions.deviceHeight,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default CreateUserScreen