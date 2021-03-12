import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    TextInput,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
} from 'react-native'
import { useSelector } from 'react-redux'
import * as firebase from 'firebase'

import InfoBar from '../../components//User/InfoBar'
import AppImagePicker from '../../components/User/AppImagePicker'

import Style from '../../constants/Style'
import CustomButton from '../../components/UI/CustomButton'
import DatabaseUrl from '../../constants/DatabaseUrl'

const CreatePostScreen = ({navigation}) => {
    const [textInput, setTextInput] = useState('')
    const [image, setImage] = useState('')

    const currentUser = useSelector((state) => state.user.currentUser)
    const localId = useSelector((state) => state.auth.localId)

    const submitHandler = async () => {
        const response = await fetch(`${DatabaseUrl}/users/${localId}/posts.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: localId,
                date: `${new Date().toTimeString().slice(0, 8)} ${new Date().toDateString()}`,
                content: textInput,
                likes: {},
                comments: {},
            })
        })
        
        const resData = await response.json()
        
        let imageDownloadUrl
        
        if(image) {
            const pickedImage = await fetch(image)
            const blob = await pickedImage.blob()
            await firebase.storage().ref().child(`${localId}/posts/${resData.name}`).put(blob)
            var storageRef = firebase.storage().ref().child(`${localId}/posts/${resData.name}`).put(blob)
            imageDownloadUrl = await storageRef.snapshot.ref.getDownloadURL()
        }

        // after creating the new post, i'll give it an id for editing later in database
        await fetch(`${DatabaseUrl}/users/${localId}/posts/${resData.name}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: resData.name,
                imageUri: imageDownloadUrl || '',
            })
        })

        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton 
                    title="Post"
                    onPress={textInput === '' ? () => Alert.alert("Dont' leave the text blank!") : submitHandler}
                    style={Style.headerRightButtonStyle}
                />
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={Style.editPostTextInput}
                        multiline={true}
                        placeholder=" What's on your mind?"
                        onChangeText={(text) => {setTextInput(text)}}
                        value={textInput}
                    />
                    <AppImagePicker
                        canToggle={true}
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
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
    },
})

export default CreatePostScreen