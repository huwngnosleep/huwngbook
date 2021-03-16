import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import { Badge } from 'react-native-elements'
import { useSelector } from 'react-redux'
import AppColors from '../../constants/AppColors'
import DatabaseUrl from '../../constants/DatabaseUrl'
import TempDisableOnPressTime from '../../constants/TempDisableOnPressTime'
import InfoBar from '../User/InfoBar'

export default function ChatListItem ({userId, onPress = () => {}}) {
    const [user, setUser] = useState({
        name: '',
        userName: '',
        avatar: '',
    })
    const [numberPending, setNumberPending] = useState(0)
    const [active, setActive] = useState(true)
    
    const localId = useSelector((state) => state.auth.localId)

    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = useCallback(() => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, TempDisableOnPressTime)
    }, [setActive])


    const fetchNumberPendingMessage = useCallback(async () => {
        const fetchedNumber = await (await fetch(`${DatabaseUrl}/users/${localId}/pendingUnreadMessages/${userId}.json`)).json()
        if(fetchedNumber) {
            
            setNumberPending(fetchedNumber)
        }
    })

    const fetchData = useCallback(async () => {
        const name = await (await fetch(`${DatabaseUrl}/users/${userId}/name.json`)).json()
        const avatar = await (await fetch(`${DatabaseUrl}/users/${userId}/avatar.json`)).json()
        const userName = await (await fetch(`${DatabaseUrl}/users/${userId}/userName.json`)).json()

        setUser({
            name,
            avatar,
            userName,
        })
    }, [setUser])

    useEffect(() => {
        fetchData()
        fetchNumberPendingMessage()
    }, [fetchData, fetchNumberPendingMessage])
    
    return(
        <TouchableOpacity 
            onPress={
                active ? 
                    async () => {
                        setNumberPending(0)
                        tempDisableButton()
                        onPress()
                    }
                    :
                    () => {}
            }
            style={styles.container} 
        >
            <InfoBar 
                mainText={user.name}
                customText={'@' + user.userName}
                imageUri={user.avatar}
            />
            {numberPending !== 0 ? <Badge value={numberPending} status="error" containerStyle={styles.badgeStyle} /> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.mainGrey,
        paddingBottom: 10,
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        left: -4,
    },
})