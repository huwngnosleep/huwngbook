import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import CustomIcon from '../../components/UI/CustomIcon'
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'
import PostCommentCreator from '../../components/User/Post/PostCommentCreator'
import AppColors from '../../constants/AppColors'
import DatabaseUrl from '../../constants/DatabaseUrl'
import { useSelector } from 'react-redux'

import { firestore } from '../../firebase.ultis'

export default function ChatScreen ({route, navigation}) {
    const { userId } = route.params

    const localId = useSelector((state) => state.auth.localId)
    const [textInput, setTextInput] = useState('')
    const [userData, setUserData] = useState({})
    const [messages, setMessages] = useState([])

    const fetchUserData = useCallback(async () => {
        const name = await (await fetch(`${DatabaseUrl}/users/${userId}/name.json`)).json()
        
        const doc = await firestore.collection(`${localId}`).get()
        console.log(doc)

        setUserData({
            name,
        })
    }, [setUserData])
    
    useEffect(() => {
        fetchUserData().then(() => {
            navigation.setOptions({
                title: userData.name
            })
        })
    }, [fetchUserData])
    
    const submitHandler = async (text) => {

    }

    return(
        <CustomKeyboardAvoidView style={styles.screen} >
            <View style={styles.chatContainer}>
                <Text>ABCD</Text>
            </View>
            <PostCommentCreator 
                value={textInput}
                textSubmitHandler={submitHandler}
                style={styles.textInput}
            />
        </CustomKeyboardAvoidView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
    },
    textInput: {
        alignSelf: 'center',
        width: '90%',
    },
})