import React, { useState, useCallback, useEffect } from 'react'
import { 
    Image,
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'

import AppColors from '../../constants/AppColors'
import DatabaseUrl from '../../constants/DatabaseUrl'
import Style from '../../constants/Style'

export default function FriendCard ({style, friendId, navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [friendData, setFriendData] = useState({})

    const fetchFriendData = useCallback(async () => {
        try {
            const fetchedData = await (await fetch(`${DatabaseUrl}/users/${friendId}.json`)).json()

            const loadedData = {}
            for(const key in fetchedData) {
                loadedData[key] = fetchedData[key]
            }
            setFriendData(loadedData)
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetchFriendData().then(() => {
            setIsLoading(false)
        })
    }, [setIsLoading, fetchFriendData])

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
        backgroundColor: AppColors.mainWhite,
        margin: 10,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 5,
        ...Style.cardShadow,
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    nameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '100%',
        backgroundColor: AppColors.mainGreyLighter,
    },

})
