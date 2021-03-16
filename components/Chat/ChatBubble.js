import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import AppColors from '../../constants/AppColors'

export default function ChatBubble ({content, time, senderId}) {
    const [isTimeVisible, setTimeVisible] = useState(false)

    const localId = useSelector((state) => state.auth.localId)

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            alignSelf: senderId === localId ? 'flex-end' : 'flex-start',
            overflow: 'hidden',
        },
        messageContainer: {
            backgroundColor: senderId === localId ? AppColors.mainGrey : AppColors.mainGreyLighter,
            marginVertical: 7,
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderColor: AppColors.mainGrey,
            borderWidth: 1,
            borderRadius: 50,
        },
        timeText: {
            textAlign: senderId === localId ? 'right' : 'left',
            opacity: isTimeVisible ? 0.3 : 0,
            fontSize: 12,
        },
        message: {
            textAlign: senderId === localId ? 'right' : 'left',
            fontSize: 16,
        },

    })
    
    return(
        <TouchableOpacity 
            onPress={() => {setTimeVisible((prevState) => !prevState)}}
            style={styles.container} 
        >
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{content}</Text>
            </View>
                {
                    isTimeVisible ?
                        <View style={styles.timeText}>
                            <Text>{time}</Text>
                        </View>
                        :
                        null
                }
        </TouchableOpacity>
    )
}

