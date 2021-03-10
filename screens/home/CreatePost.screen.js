import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    Button,
    TextInput,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../store/actions/user/post.actions'

import InfoBar from '../../components//User/InfoBar'
import AppImagePicker from '../../components/User/AppImagePicker'

import HeaderRightButtonStyle from '../../constants/HeaderRightButtonStyle'
import Style from '../../constants/Style'

const CreatePostScreen = ({navigation}) => {
    const [textInput, setTextInput] = useState('')
    const [image, setImage] = useState('')

    const currentUser = useSelector((state) => state.user.currentUser)
    const localId = useSelector((state) => state.auth.localId)

    const dispatch = useDispatch()

    const submitHandler = async () => {
        dispatch(createPost(localId, {
            ownerId: localId,
            date: new Date().toDateString(),
            imageUri: image,
            content: textInput,
        }))
        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{...HeaderRightButtonStyle}}>
                    <Button 
                        disabled={textInput === '' ? true : false}
                        title="Post"
                        onPress={submitHandler}
                    />
                </View>
            )
        })
    })

    return(
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView 
                
                onPress={() => {Keyboard.dismiss()}}
            >
                <View style={styles.header}>
                    <InfoBar 
                        imageUri={currentUser.avatar} 
                        mainText={currentUser.name} 
                        customText={new Date().toDateString()}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder=" What's on your mind?"
                        onChangeText={(text) => {setTextInput(text)}}
                        value={textInput}
                    />
                    <AppImagePicker
                        onImageTaken={(imageUri) => setImage(imageUri)}
                        currentImage={image}
                        style={{...Style.imagePicker}}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    textInputContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    textInput: {
        fontSize: 18,
    },
})

export default CreatePostScreen