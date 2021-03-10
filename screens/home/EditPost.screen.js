import React, { useEffect, useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    Button,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editPost } from '../../store/actions/user/post.actions'

import DeviceDimensions from '../../constants/DeviceDimensions'
import InfoBar from '../../components/InfoBar'
import HeaderRightButtonStyle from '../../constants/HeaderRightButtonStyle'
import CustomImage from '../../components/CustomImage'

const EditPostScreen = ({route, navigation}) => {
    const { currentPostData } = route.params
    
    const [content, setContent] = useState(currentPostData.content)

    const localId = useSelector((state) => state.auth.localId)
    const currentUserName = useSelector((state) => state.user.currentUser.name)
    const currentUserAvatar = useSelector((state) => state.user.currentUser.avatar)

    const dispatch = useDispatch()

    const submitHandler = useCallback(async () => {
        dispatch(editPost(localId, currentPostData.id, content))
        navigation.goBack()
    }, [dispatch, content])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{...HeaderRightButtonStyle}}>
                    <Button 
                        disabled={content === '' ? true : false}
                        title="Save"
                        onPress={submitHandler}
                    />
                </View>
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
                        customText={currentPostData.date}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        onChangeText={(text) => {setContent(text)}}
                        value={content}
                    />
                    <CustomImage imageUri={currentPostData.imageUri}/>
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
        marginBottom: 10,
    },
    textInput: {
        fontSize: 18,
    },
})

export default EditPostScreen