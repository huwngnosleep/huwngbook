import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Alert,
} from 'react-native'
import { useSelector } from 'react-redux'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import ActionButton from '../ActionButton'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../../constants/AppColors'

const PostActionsBar = ({postData}) => {
    const { likes, comments, ownerId, postId} = postData

    const localId = useSelector((state) => state.auth.localId)

    const [likesNumber, setLikesNumber] = useState(Object.keys({...likes}).length)

    const [commentsNumber, setCommentsNumber] = useState(Object.keys({...comments}).length)

    const checkIsLiked = () => {
        for(const key in likes) {
            if(likes[key].localId === localId) {
                return true
            }
        }
        return false
    }

    const [isLiked, setIsLiked] = useState(checkIsLiked())

    const likeButtonHandler = async () => {            
            if(isLiked === true) {
                return Alert.alert(
                    'Enough!',
                    'You liked this post before.'
                )
            } 
    
            fetch(`${DatabaseUrl}/users/${ownerId}/posts/${postId}/likes.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    localId,
                })
            })

            setIsLiked(true)
            setLikesNumber(likesNumber + 1)
    }

    return(
        <View>
            <View style={styles.postStatusContainer}>
                    <View style={styles.postStatusItem}>
                        <Text style={styles.postStatusNumber}>{likesNumber}</Text>
                        <Icon 
                            name="heart"
                            color={AppColors.mainBlack}
                            size={20}
                        />
                    </View>
                    <View style={styles.postStatusItem}>
                        <Text style={styles.postStatusNumber}>{commentsNumber}</Text>
                        <Icon 
                            name="chatbox-ellipses"
                            color={AppColors.mainBlack}
                            size={20}
                        />
                    </View>
                </View>
            <View style={styles.actionsContainer}>
                <ActionButton 
                    onPress={likeButtonHandler}
                    style={styles.action} 
                    iconName={isLiked ? "heart" : "heart-outline"} 
                    action={isLiked ? "Liked" : "Like"} 
                />
                <ActionButton 
                    style={styles.action} 
                    iconName="chatbox-ellipses-outline" 
                    action="Comment"
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        width: '50%',
    },
    postStatusContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginVertical: 10,
    },
    postStatusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    postStatusNumber: {
        marginRight: 3,
        fontWeight: 'bold',
        fontSize: 20,
    },
})

export default PostActionsBar