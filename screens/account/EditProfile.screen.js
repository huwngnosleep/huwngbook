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
import EditProfileItemContainer from '../../components/EditProfileItemContainer';


const EditUserInfoScreen = (props) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const currentLocalId = useSelector((state) => state.auth.localId)

    const [name, setName] = useState(currentUser.name)
    const [userName, setUserName] = useState(currentUser.userName)
    const [bio, setBio] = useState(currentUser.bio)
    const [address, setAddress] = useState(currentUser.address)
    const [birthday, setBirthday] = useState(currentUser.birthday)
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber)
    const [email, setEmail] = useState(currentUser.email)

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        dispatch(editUser(currentLocalId, {
            name,
            userName,
            bio,
            address,
            birthday,
            phoneNumber,
            email,
        }))
        props.navigation.goBack()
    }, [dispatch, name, userName, bio, address, birthday, phoneNumber, email])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRightButton}>
                    <Button 
                        title="Save"
                        onPress={submitHandler}
                    />
                </View>
            )
        })
    })

    return(
        <View style={styles.screen}>
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
                    editable={false}
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
    headerRightButton: {
        marginRight: 10,
    },
})

export default EditUserInfoScreen