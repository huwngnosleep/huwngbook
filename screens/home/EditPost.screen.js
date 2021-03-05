import React, { useEffect, useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    Button,
    TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editPost } from '../../store/actions/user/post.actions'

import DeviceDimensions from '../../constants/DeviceDimensions'
import InfoBar from '../../components/InfoBar'
import HeaderRightButtonStyle from '../../constants/HeaderRightButtonStyle'

const EditPostScreen = ({route, navigation}) => {
    const { currentPostData } = route.params
    
    const [content, setContent] = useState(currentPostData.content)

    const localId = useSelector((state) => state.auth.localId)

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
        <View 
            style={styles.container}
        >
            <View style={styles.header}>
                <InfoBar mainText={currentPostData.owner} customText={currentPostData.date}/>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(text) => {setContent(text)}}
                    value={content}
                />
            </View>
        </View>
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
        height: DeviceDimensions.deviceHeight / 3,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 10,
    },
    textInput: {
        fontSize: 18,
    },
})

export default EditPostScreen