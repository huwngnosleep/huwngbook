import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'
import MessageCreator from '../../components/User/MessageCreator'
import DatabaseUrl from '../../constants/DatabaseUrl'
import { useSelector } from 'react-redux'
import { firestore } from '../../firebase.ultis'
import { FlatList } from 'react-native-gesture-handler'
import ChatBubble from '../../components/Chat/ChatBubble'

export default function ChatScreen ({route, navigation}) {
    const { userId } = route.params
    const localId = useSelector((state) => state.auth.localId)
    
    const messagesRef = firestore.collection(`${localId}/messages/${userId}`)
    const receiverMessagesRef = firestore.collection(`${userId}/messages/${localId}`)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = messagesRef.onSnapshot((querySnapShot) => {
            const messagesFirestore = querySnapShot.docChanges().filter(({type}) => type === 'added').map(
                ({doc}) => {
                    const message = doc.data()
                    return message
                }
            ).sort((message1, message2) => message1.createAt - message2.createAt)
            setMessages((prevState) => prevState.concat(messagesFirestore))
        })
        return () => unsubscribe()
    }, [])

    const fetchReceiverData = useCallback(async () => {
        const receiverName = await (await fetch(`${DatabaseUrl}/users/${userId}/name.json`)).json()
        navigation.setOptions({
            title: receiverName
        })
    }, [navigation])

    useEffect(() => {
        fetchReceiverData()
        // remove pending unread messages on entering this screen
        fetch(`${DatabaseUrl}/users/${localId}/pendingUnreadMessages/${userId}.json`, {
            method: 'DELETE',
        })
    }, [fetchReceiverData])
    
    const submitHandler = async (text) => {
        if(text.trim().length === 0) {
            return
        }
        const message = {
            text,
            createAt: Date.now(),
            senderId: `${localId}`,
        }
        try {
            // add message to local user
            messagesRef.add(message)

            // add message to receiver user
            receiverMessagesRef.add(message)

            // get current number of pending unread messages
            const currentNumberPendingMessages = await (await (fetch(`${DatabaseUrl}/users/${userId}/pendingUnreadMessages/${localId}.json`))).json()

            // increase that number by 1
            fetch(`${DatabaseUrl}/users/${userId}/pendingUnreadMessages.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [localId]: currentNumberPendingMessages ? currentNumberPendingMessages + 1 : 1
                })
            })
        
        } catch (error) {
            console.log(error)
        }
    }
    
    if(messages.length === 0) {
        return(
            <CustomKeyboardAvoidView style={styles.screen} >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Say 'Hi!' to your friend</Text>
                </View>
                <MessageCreator 
                    textSubmitHandler={submitHandler}
                    style={styles.textInput}
                />
            </CustomKeyboardAvoidView>
        )
    }

    return(
        <CustomKeyboardAvoidView style={styles.screen} >
            <FlatList 
                inverted={-1}
                contentContainerStyle={styles.chat}
                data={messages}
                keyExtractor={(item) => item.createAt}
                renderItem={(itemData) => 
                    <ChatBubble 
                        senderId={itemData.item.senderId}
                        content={itemData.item.text}
                        time={`${new Date(itemData.item.createAt).toTimeString().slice(0, 5)}, ${new Date(itemData.item.createAt).toDateString().slice(4)}`}
                    />
                }
            />
            <MessageCreator 
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
    chat: {
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'column-reverse',
    },
    textInput: {
        alignSelf: 'center',
        width: '90%',
    },
})