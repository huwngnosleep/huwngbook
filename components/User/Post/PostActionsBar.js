import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Alert,
} from 'react-native'
import { useSelector } from 'react-redux'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import ActionButton from '../../UI/ActionButton'
import AppColors from '../../../constants/AppColors'
import PostCommentCreator from './PostCommentCreater'
import PostStatusPopup from './PostStatusPopup'
import CustomIcon from '../../UI/CustomIcon'

export default function PostActionsBar ({postData, navigation}) {
    const { likes, comments, ownerId, postId} = postData
    const localId = useSelector((state) => state.auth.localId)

    const [likesNumber, setLikesNumber] = useState(Object.keys({...likes}).length)
    const [commentsNumber, setCommentsNumber] = useState(Object.keys({...comments}).length)
    const [isCommenting, setIsCommenting] = useState(false)

    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false)
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false)

    const checkIsLiked = () => {
        for(const key in likes) {
            if(likes[key].likeOwnerId === localId) {
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
    
            const response = await fetch(`${DatabaseUrl}/users/${ownerId}/posts/${postId}/likes.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likeOwnerId: localId,
                })
            })

            if(response.ok === false) {
                return
            }

            setIsLiked(true)
            setLikesNumber(likesNumber + 1)
    }

    const commentSubmitHandler = async (content) => {

        if(content.trim().length === 0) {
            return
        }
        
        const response = await fetch(`${DatabaseUrl}/users/${ownerId}/posts/${postId}/comments.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentOwnerId: localId,
                date: `${new Date().toTimeString().slice(0, 8)} ${new Date().toDateString()}`,
                content,
            })
        })

        if(response.ok === false) {
            return
        }

        setCommentsNumber(commentsNumber + 1)

    } 

    return(
        <View>
            <View style={styles.postStatusContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <Text style={styles.postStatusNumber}>{likesNumber}</Text>
                        <CustomIcon 
                            onPress={() => setIsLikesModalVisible(true)}
                            name="heart"
                            color={AppColors.mainBlack}
                            size={20}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <Text style={styles.postStatusNumber}>{commentsNumber}</Text>
                        <CustomIcon 
                            onPress={() => setIsCommentsModalVisible(true)}
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
                    onPress={() => {
                        setIsCommenting((prevState) => !prevState)
                    }}
                    style={styles.action} 
                    iconName="chatbox-ellipses-outline" 
                    action="Comment"
                />
            </View>
            {
                isCommenting ? 
                    <PostCommentCreator commentSubmitHandler={commentSubmitHandler}/>
                    :
                    null   
            }
            <PostStatusPopup
                renderedItemsType="likes"
                ownerId={ownerId}
                postId={postId}
                isModalVisible={isLikesModalVisible} 
                setIsModalVisible={setIsLikesModalVisible}
            />
            <PostStatusPopup
                renderedItemsType="comments"
                ownerId={ownerId}
                postId={postId}
                isModalVisible={isCommentsModalVisible} 
                setIsModalVisible={setIsCommentsModalVisible}
            />
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
