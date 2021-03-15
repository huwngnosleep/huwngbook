import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import { Badge } from 'react-native-elements'
import DatabaseUrl from '../../constants/DatabaseUrl'
import InfoBar from '../User/InfoBar'

export default function ChatListItem ({userId, onPress = () => {}}) {
    const [user, setUser] = useState({
        name: '',
        userName: '',
        avatar: '',
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
    }, [fetchData])
    
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container} 
        >
            <InfoBar 
                mainText={user.name}
                customText={'@' + user.userName}
                imageUri={user.avatar}
            />
            <Badge value="5" status="error" containerStyle={styles.badgeStyle} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        left: -4,
    },
})