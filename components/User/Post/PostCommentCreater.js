import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux'
import AppColors from '../../../constants/AppColors'
import Avatar from '../Avatar'

const PostCommentCreator = ({ commentSubmitHandler }) => {
    const avatar = useSelector((state) => state.user.currentUser.avatar)
    
    const [isSending, setIsSending] = useState(false)
    const [comment, setComment] = useState('')

    const [active, setActive] = useState(true)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = () => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, 3000)
    }

    return(
        <View style={styles.textInputContainer}>
            <View style={styles.avatarContainer}>
                <Avatar imageUri={avatar} style={styles.avatar} />
            </View>
            <View style={styles.inputContainer}> 
                {
                    isSending ? 
                        <Text style={{color: AppColors.mainGrey}}>Sending...</Text>
                        :
                        <TextInput  
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                            placeholder="Type something..."
                            multiline={true}
                            style={styles.textInput}
                        />
                }
                <TouchableOpacity 
                    onPress={active === true ?
                        () => {
                            tempDisableButton()
                            setIsSending(true)
                            commentSubmitHandler(comment).then(() => {
                                setComment('')
                                setIsSending(false)
                            })}
                        :
                        () => {}
                    }
                    style={styles.iconContainer}
                >
                    <Icon 
                        name={ comment.length > 0 ? "paper-plane" : "paper-plane-outline" }
                        color={AppColors.mainBlack}
                        size={25}
                        style={styles.icon}
                    />
                </TouchableOpacity>
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
    iconContainer: {
        marginHorizontal: 5,
    },
    textInput: {
        width: '80%',
    },
})

export default PostCommentCreator