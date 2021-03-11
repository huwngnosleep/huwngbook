import React, { useState, useEffect, useCallback } from 'react'
import { 
    StyleSheet, 
    View,
    ScrollView, 
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../store/actions/user/user.actions'

import CustomTextInput from '../../components/UI/CustomTextInput'
import DeviceDimensions from '../../constants/DeviceDimensions'
import CustomButton from '../../components/UI/CustomButton'
import Style from '../../constants/Style'


const EditUserInfoScreen = ({navigation}) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const localId = useSelector((state) => state.auth.localId)

    const [name, setName] = useState(currentUser.name)
    const [userName, setUserName] = useState(currentUser.userName)
    const [bio, setBio] = useState(currentUser.bio)
    const [address, setAddress] = useState(currentUser.address)
    const [birthday, setBirthday] = useState(currentUser.birthday)
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber)
    const [email, setEmail] = useState(currentUser.email)

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(editUser(localId, {
            name,
            userName,
            bio,
            address,
            birthday,
            phoneNumber,
            email,
        }))
        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton 
                    title="Save"
                    onPress={submitHandler}
                    style={Style.headerRightButtonStyle}
                />
            )
        })
    })

    return(
            <ScrollView contentContainerStyle={styles.container}>
                <CustomTextInput 
                    label="Full Name"
                    placeholder={currentUser.name}
                    onChangeText={(text) => setName(text)}
                />
                <CustomTextInput 
                    label="User Name"
                    placeholder={currentUser.userName}
                    onChangeText={(text) => setUserName(text)}
                />
                <CustomTextInput 
                    label="Bio"
                    placeholder={currentUser.bio}
                    onChangeText={(text) => setBio(text)}
                />
                <CustomTextInput 
                    label="Address"
                    placeholder={currentUser.address}
                    onChangeText={(text) => setAddress(text)}
                />
                <CustomTextInput 
                    label="Birthday"
                    editable={false}
                    placeholder={currentUser.birthday}
                    onChangeText={(text) => setBirthday(text)}
                />
                <CustomTextInput 
                    label="Phone Number"
                    placeholder={currentUser.phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <CustomTextInput 
                    label="Email"
                    editable={false}
                    placeholder={currentUser.email}
                    onChangeText={(text) => setEmail(text)}
                />
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: DeviceDimensions.deviceWidth * 0.8,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default EditUserInfoScreen