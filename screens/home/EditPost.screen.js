import React, { useEffect, useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from 'react-native'
import { useSelector } from 'react-redux'

import InfoBar from '../../components/User/InfoBar'
import CustomImage from '../../components/UI/CustomImage'

import CustomButton from '../../components/UI/CustomButton'
import Style from '../../constants/Style'
import DatabaseUrl from '../../constants/DatabaseUrl'

const EditPostScreen = ({route, navigation}) => {
    const { postData } = route.params
    
    const [content, setContent] = useState(postData.content)

    const localId = useSelector((state) => state.auth.localId)
    const currentUserName = useSelector((state) => state.user.currentUser.name)
    const currentUserAvatar = useSelector((state) => state.user.currentUser.avatar)

    const submitHandler = async () => {
        await fetch(`${DatabaseUrl}/users/${localId}/posts/${postData.postId}.json`,  {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
            })
        })

        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton 
                    title="Save"
                    onPress={content === '' ? () => Alert.alert("Dont' leave the text blank!!!") : submitHandler}
                    style={Style.headerRightButtonStyle}
                />
            )
        })
    })

    return(
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.header}>
                    <InfoBar 
                        imageUri={currentUserAvatar} 
                        mainText={currentUserName} 
                        customText={postData.date}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={Style.editPostTextInput}
                        multiline={true}
                        onChangeText={(text) => {setContent(text)}}
                        value={content}
                    />
                    <CustomImage imageUri={postData.imageUri}/>
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

export default EditPostScreen