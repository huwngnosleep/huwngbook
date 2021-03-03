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
import { editUser } from '../../store/actions/user.actions'

import AlertText from '../../components/AlertText'
import CustomTextInput from '../../components/CustomTextInput'
import DeviceDimensions from '../../constants/DeviceDimensions'

import DatePicker from 'react-native-datepicker'
import HeaderRightButtonStyle from '../../constants/HeaderRightButtonStyle';

const CreateUserScreen = (props) => {
    const [alertText, setAlertText] = useState(props.route.params.alertText)
    setTimeout(() => {
        setAlertText('')
    }, 3000)

    const [isInputValid, setIsInputValid] = useState(false)

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState()

    const dispatch = useDispatch()

    const currentUserId = useSelector((state) => state.auth.localId)

    const submitHandler = useCallback(() => {
        dispatch(editUser(currentUserId, {
            name,
            userName,
            avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
            birthday,
            phoneNumber,
            gender,
        }))
        props.navigation.dispatch(
            StackActions.pop()
        )
    }, [dispatch, name, userName, birthday, phoneNumber, gender])

    const inputValidation = () => {

        if(
            name.trim().length > 0 &&
            userName.length > 0 &&
            String(birthday).length > 0 &&
            phoneNumber.length > 0
        ) {
            return setIsInputValid(true)
        } else {
            return setIsInputValid(false)
        }
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{...HeaderRightButtonStyle}}>
                    <Button 
                        disabled={isInputValid ? false : true}
                        title="Create"
                        onPress={submitHandler}
                    />
                </View>
            )
        })
    })

    return(
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <AlertText style={styles.alertText} alertText={alertText} />
                <CustomTextInput 
                    placeholder="Full name"
                    onChangeText={(text) => {
                        setName(text, inputValidation())
                        
                    }}
                />
                <CustomTextInput 
                    placeholder="User name"
                    autoCapitalize='none'
                    onChangeText={(text) => {
                        setUserName('@' + text, inputValidation())
                    }}
                />
                <CustomTextInput 
                    placeholder="Phone number"
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                        setPhoneNumber(String(text), inputValidation())
                    }}
                />
                <DatePicker
                    style={{
                        width: '100%',
                    }}
                    date={birthday}
                    mode="date"
                    placeholder="Select your birthday"
                    format="YYYY-MM-DD"
                    minDate="1940-05-01"
                    maxDate="2030-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                        placeholderText: {
                            ...styles.dataPickerText
                        },
                        dateText: {
                            ...styles.dataPickerText,
                            color: 'black',
                        },
                        btnTextCancel: {
                            color: 'red',
                        },
                        btnTextConfirm: {
                            color: 'blue',
                        },
                        dateInput: {
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                        }
                    }}
                    onDateChange={(date) => {setBirthday(date)}}
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
        height: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    alertText: {
        top: -40,
        position: 'absolute',
    },
    dataPickerText: {
        position: 'absolute',
        left: 0,
        color: 'grey',
        fontSize: 20,
    }
})

export default CreateUserScreen