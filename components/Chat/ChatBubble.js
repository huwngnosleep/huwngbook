import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import AppColors from '../../constants/AppColors'
import DeviceDimensions from '../../constants/DeviceDimensions'

export default function ChatBubble ({content, time, senderId}) {
    const [isTimeVisible, setTimeVisible] = useState(false)

    const localId = useSelector((state) => state.auth.localId)

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            alignSelf: senderId === localId ? 'flex-end' : 'flex-start',
            overflow: 'hidden',
            maxWidth: DeviceDimensions.deviceWidth * 0.5,
        },
        messageContainer: {
            backgroundColor: senderId === localId ? AppColors.mainGrey : AppColors.mainGreyLighter,
            marginVertical: 7,
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderColor: AppColors.mainGrey,
            borderWidth: 1,
            borderRadius: 20,
            borderBottomEndRadius: senderId === localId ? 0 : null,
            borderBottomStartRadius: senderId !== localId ? 0 : null,
        },
        timeText: {
            alignSelf: senderId === localId ? 'flex-end' : 'flex-start',
            opacity: isTimeVisible ? 0.3 : 0,
            fontSize: 12,
            marginHorizontal: 10,
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
                <Text 
                    style={styles.message}
                    
                >
                    {content}
                </Text>
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
