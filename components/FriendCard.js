import React, { useState, useCallback, useEffect } from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import DatabaseUrl from '../constants/DatabaseUrl'

const FriendCard = ({style, friendId, navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [friendData] = useState({})
    const fetchFriendData = useCallback(async () => {
        try {
            const response = await fetch(`${DatabaseUrl}/users/${friendId}.json`)
            const resData = await response.json()
            for(const key in resData) {
                friendData[key] = resData[key]
            }
            
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }, [setError])

    useEffect(() => {
        setIsLoading(true)
        fetchFriendData().then(() => {
            setIsLoading(false)
        })
    }, [setError, fetchFriendData])

    if (error) {
        return null
    }

    if (isLoading) {
        return null
    }

    return(
        <TouchableOpacity 
            style={{...styles.container, ...style}}
            onPress={() => {
                navigation.navigate('Other Profile', {userId: friendId})
            }} 
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: friendData.avatar}}
                    style={styles.image}
                />
            </View>
            <View style={styles.nameContainer}>
                <Text>{friendData.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 150,
        maxWidth: 150,
        backgroundColor: 'white',
        margin: 10,
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: '80%',
        overflow: 'hidden',
        borderRadius: 5,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    nameContainer: {
        alignItems: 'center',
        height: '20%',
        width: '100%',
        backgroundColor: 'white',
    },

})

export default FriendCard