import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'
import PostCommentCreator from '../../components/User/Post/PostCommentCreator'
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
        
        // firestore.collection("characters").doc("mario").set({
        //     employment: "hjhj",
        //     outfitColor: "bla",
        //     specialAttack: "bla"
        // })

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