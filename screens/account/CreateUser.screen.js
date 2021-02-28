import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    View,
    ScrollView, 
    Text,
    Button,
} from 'react-native'
import { StackActions } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../store/actions/user.actions'

import AlertText from '../../components/AlertText'
import CustomTextInput from '../../components/CustomTextInput'
import DeviceDimensions from '../../constants/DeviceDimensions'

const CreateUserScreen = (props) => {
    const [alertText, setAlertText] = useState(props.route.params.alertText)
    const [isInputValid, setIsInputValid] = useState(false)

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [birthday, setBirthday] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [gender, setGender] = useState()

    const dispatch = useDispatch()

    const currentUserId = useSelector((state) => state.auth.localId)

    const submitHandler = useCallback(() => {
        dispatch(createUser(currentUserId, {
            name,
            userName,
            avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
            birthday,
            phoneNumber,
            gender,
        }))
    }, [dispatch, name, userName, birthday, phoneNumber, gender])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRightButton}>
                    <Button 
                        disabled={false}
                        title="Create"
                        onPress={() => {
                            submitHandler()
                            props.navigation.dispatch(
                                StackActions.pop()
                            )
                        }}
                    />
                </View>
            )
        })
    })

    return(
        <View contentContainerStyle={styles.screen}>
            <ScrollView style={styles.container}>
                <AlertText alertText={alertText} />
                <CustomTextInput 
                    label="Full name" 
                    placeholder="Thanh Hung Nguyen"
                    onChangeText={(text) => setName(text)}
                />
                <CustomTextInput 
                    label="User name" 
                    placeholder="@huwngnosleep"
                    autoCapitalize='none'
                    onChangeText={(text) => setUserName(text)}
                />
                <CustomTextInput 
                    label="Birthday" 
                    placeholder="30/2/1999"
                    keyboardType="number-pad"
                    onChangeText={(text) => {setBirthday(text)}}
                />
                <CustomTextInput 
                    label="Phone number" 
                    placeholder="0123456789"
                    keyboardType="number-pad"
                    onChangeText={(text) => {setPhoneNumber(text)}}
                />
                <CustomTextInput 
                    label="Gender" 
                    placeholder="Male"
                    onChangeText={(text) => setGender(text)}
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
    headerRightButton: {
        marginRight: 10,
    },
})

export default CreateUserScreen