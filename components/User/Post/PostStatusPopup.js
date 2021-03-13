import React, { useCallback, useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../../constants/AppColors'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import DeviceDimensions from '../../../constants/DeviceDimensions'
import CommentListItem from './CommentListItem'
import LikeListItem from './LikeListItem'


const PostStatusPopup = ({isModalVisible, setIsModalVisible, ownerId, postId, renderedItemsType}) => {

    const title = renderedItemsType[0].toUpperCase() + renderedItemsType.substring(1);

    const [content, setContent] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const fetchedData = await (await fetch(`${DatabaseUrl}/users/${ownerId}/posts/${postId}/${renderedItemsType}.json`)).json()
            
            // fetched Data is hash table, need converting to array for rendering
            const loadedContent = []
            for(const key in fetchedData) {
                loadedContent.push(fetchedData[key])
            }
    
            setContent(loadedContent)
            
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)

    }, [setContent, setIsLoading])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetchData().then(() => {
    //         setIsLoading(false)
    //     })
    // }, [fetchData])

    return(
        <Modal 
            transparent={true}
            animationType="fade" 
            visible={isModalVisible}
            onShow={fetchData}
        >
            <View 
                style={{backgroundColor: '#000000aa', flex: 1,}}
            >
                    <View style={styles.listContainer}>
                        <Text style={styles.title}>{title}</Text> 
                        <ScrollView style={styles.list}>
                            {
                                renderedItemsType === 'comments' ?
                                content.map((item) => 
                                    <CommentListItem 
                                        key={`${item.commentOwnerId}${item.date}`}
                                        commentOwnerId={item.commentOwnerId}
                                        content={item.content}
                                        date={item.date}
                                    />
                                )
                                :
                                content.map((item) => 
                                    <LikeListItem 
                                        key={item.likeOwnerId}
                                        likeOwnerId={item.likeOwnerId}
                                    />
                                )
                            }
                        </ScrollView>
                        <TouchableOpacity
                            style={{position: 'absolute', bottom: 10, right: 10,}}
                            onPress={() => {setIsModalVisible(false)}}
                        >
                            <Icon 
                                name="close"
                                color={AppColors.mainBlack}
                                size={30}
                                
                                />
                        </TouchableOpacity>
                    </View>
            </View>
        </Modal>        

    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 18,
    },
    listContainer: {
        alignSelf: 'center',
        backgroundColor: AppColors.mainWhite,
        width: DeviceDimensions.deviceWidth * 0.8,
        height: DeviceDimensions.deviceHeight * 0.8,
        flex: 1,
        margin: DeviceDimensions.deviceWidth * 0.1,
        paddingBottom: 30,
        borderRadius: 10,
    },
    list: {
        margin: 20,
    },
})

export default PostStatusPopup