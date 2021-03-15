import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
} from 'react-native'
import { useSelector } from 'react-redux'
import AppColors from '../../../constants/AppColors'
import CustomIcon from '../../UI/CustomIcon'
import Avatar from '../Avatar'

export default function PostCommentCreator ({ textSubmitHandler, style }) {
    const avatar = useSelector((state) => state.user.currentUser.avatar)
    
    const [isSending, setIsSending] = useState(false)
    const [text, setText] = useState('')

    return(
        <View style={{...styles.textInputContainer, ...style}}>
            <View style={styles.avatarContainer}>
                <Avatar imageUri={avatar} style={styles.avatar} />
            </View>
            <View style={styles.inputContainer}> 
                {
                    isSending ? 
                        <Text style={{color: AppColors.mainGrey}}>Sending...</Text>
                        :
                        <TextInput  
                            value={text}
                            onChangeText={(text) => setText(text)}
                            placeholder="Type something..."
                            multiline={true}
                            style={styles.textInput}
                        />
                }
                <CustomIcon 
                    onPress={() => {
                        setIsSending(true)
                        textSubmitHandler(text).then(() => {
                            setText('')
                            setIsSending(false)
                        })
                    }}
                    name={text.length > 0 ? "paper-plane" : "paper-plane-outline"}
                    color={AppColors.mainBlack}
                    size={25}
                    style={styles.customIcon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginVertical: 10,
        height: 60,
        borderColor: AppColors.mainGrey,
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    inputContainer: {
        width: '80%',
        height: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customIcon: {
        marginHorizontal: 5,
    },
    textInput: {
        width: '80%',
    },
})
