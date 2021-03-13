import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import AppColors from '../../../constants/AppColors'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import Style from '../../../constants/Style'
import InfoBar from '../InfoBar'

const LikeListItem = ({likeOwnerId}) => {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            const fetchedName = await (await fetch(`${DatabaseUrl}/users/${likeOwnerId}/name.json`)).json()
            const fetchedUserName = await (await fetch(`${DatabaseUrl}/users/${likeOwnerId}/userName.json`)).json()
            const fetchedAvatar = await (await fetch(`${DatabaseUrl}/users/${likeOwnerId}/avatar.json`)).json()
            
            setUserData({
                name: fetchedName,
                userName: fetchedUserName,
                avatar: fetchedAvatar,
            })
        } catch (error) {
            console.log(error)
        }


    }, [setUserData])

    useEffect(() => {
        setIsLoading(true)
        fetchData().then(() => {
            setIsLoading(false)
        })
    }, [fetchData, setIsLoading])

    if(isLoading === true) {
        return null
    }

    return(
        <View style={styles.container}>
            <InfoBar
                mainText={userData.name}
                customText={'@' + userData.userName}
                imageUri={userData.avatar} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: Style.postStatusListItemContainer
})

export default LikeListItem