import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    View,
    ScrollView,
    Alert, 
} from 'react-native'
import { StackActions } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../store/actions/user/user.actions'

import AlertText from '../../components/UI/AlertText'
import CustomTextInput from '../../components/UI/CustomTextInput'

import DeviceDimensions from '../../constants/DeviceDimensions'
import DatePicker from 'react-native-datepicker'
import DefaultProfileImagePlaceholder from '../../constants/DefaultProfileImagePlaceholder'
import AppColors from '../../constants/AppColors'
import CustomButton from '../../components/UI/CustomButton'
import Style from '../../constants/Style'

const CreateUserScreen = ({route, navigation}) => {
    const [alertText, setAlertText] = useState(route.params.alertText)
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

    const submitHandler = async () => {

        if(
            name.trim().length > 0 &&
            userName.length > 0 &&
            String(birthday).length > 0 &&
            phoneNumber.length > 0
        ) {
            dispatch(editUser(currentUserId, {
                name,
                userName,
                avatar: DefaultProfileImagePlaceholder,
                birthday,
                phoneNumber,
                gender,
            }))
            navigation.dispatch(
                StackActions.pop()
            )

        } else {
            Alert.alert('Your input is invalid!')
        }

    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton
                    style={Style.headerRightButtonStyle}
                    title="Create"
                    onPress={submitHandler}
                />
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
                        setName(text)
                        
                    }}
                />
                <CustomTextInput 
                    placeholder="User name"
                    autoCapitalize='none'
                    onChangeText={(text) => {
                        setUserName('@' + text)
                    }}
                />
                <CustomTextInput 
                    placeholder="Phone number"
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                        setPhoneNumber(String(text))
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
                            color: AppColors.mainBlack,
                        },
                        btnTextCancel: {
                            color: AppColors.mainRed,
                        },
                        btnTextConfirm: {
                            color: AppColors.mainBlue,
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
        color: AppColors.mainGrey,
        fontSize: 20,
    }
})

export default CreateUserScreen