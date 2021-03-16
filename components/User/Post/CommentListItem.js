import React, { useState, useCallback, useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import AppColors from '../../../constants/AppColors'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import Style from '../../../constants/Style'
import InfoBar from '../InfoBar'

export default function CommentListItem ({ commentOwnerId, content, date}) {
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const fetchOwnerData = useCallback(async () => {
        try {
            const name = await (await fetch(`${DatabaseUrl}/users/${commentOwnerId}/name.json`)).json()
            setName(name)
    
            const avatar = await (await fetch(`${DatabaseUrl}/users/${commentOwnerId}/avatar.json`)).json()
            setAvatar(avatar)
            
        } catch (error) {
            console.log(error)
        }
        
    }, [setName, setAvatar])

    useEffect(() => {
        setIsLoading(true)
        fetchOwnerData().then(() => {
            setIsLoading(false)
        })
    }, [setIsLoading, fetchOwnerData])

    if(isLoading === true) {
        return null
    }

    return(
        <View style={styles.container} >
            <InfoBar 
                mainText={name}
                customText={`${date.slice(0, 5)}, ${date.slice(13)}`}
                imageUri={avatar}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: Style.postStatusListItemContainer,
    contentContainer: {
        backgroundColor: AppColors.mainWhiteLighter,
        padding: 10,
        width: '80%',
        alignSelf: 'flex-end',
        borderColor: AppColors.mainGrey,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
    },
})
