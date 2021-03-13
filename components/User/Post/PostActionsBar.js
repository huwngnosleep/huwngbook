import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Alert,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import ActionButton from '../ActionButton'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../../constants/AppColors'
import PostCommentCreator from './PostCommentCreater'
import PostStatusPopup from './PostStatusPopup'
import CommentListItem from './CommentListItem'

const PostActionsBar = ({postData, navigation}) => {
    const { likes, comments, ownerId, postId} = postData
    const localId = useSelector((state) => state.auth.localId)

    const [active, setActive] = useState(true)
    // temporarily disable the button for 3s to decrease chance of getting bug
    const tempDisableButton = () => {
        setActive(false)
        setTimeout(() => {
           setActive(true) 
        }, 3000)
    }

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
                    <TouchableOpacity 
                        onPress={
                            active ? 
                                () => {
                                    tempDisableButton()
                                    setIsLikesModalVisible(true)
                                }
                                :
                                () => {}
                        }
                        style={styles.postStatusItem}
                    >
                        <Text style={styles.postStatusNumber}>{likesNumber}</Text>
                        <Icon 
                            name="heart"
                            color={AppColors.mainBlack}
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={
                            active ? 
                                () => {
                                    tempDisableButton()
                                    setIsCommentsModalVisible(true)
                                }
                                :
                                () => {}
                        }
                        style={styles.postStatusItem}
                    >
                        <Text style={styles.postStatusNumber}>{commentsNumber}</Text>
                        <Icon 
                            name="chatbox-ellipses"
                            color={AppColors.mainBlack}
                            size={20}
                        />
                    </TouchableOpacity>
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
                ownerId={ownerId}
                postId={postId}
                isModalVisible={isLikesModalVisible} 
                setIsModalVisible={setIsLikesModalVisible}
                renderedItemsType="likes"
                navigation={navigation}
            />
            <PostStatusPopup
                ownerId={ownerId}
                postId={postId}
                isModalVisible={isCommentsModalVisible} 
                setIsModalVisible={setIsCommentsModalVisible}
                renderedItemsType="comments"
                navigation={navigation}
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

export default PostActionsBar