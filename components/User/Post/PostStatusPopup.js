import React, { useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    ScrollView,
} from 'react-native'
import AppColors from '../../../constants/AppColors'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import DeviceDimensions from '../../../constants/DeviceDimensions'
import CustomIcon from '../../UI/CustomIcon'
import CommentListItem from './CommentListItem'
import LikeListItem from './LikeListItem'


export default function PostStatusPopup ({isModalVisible, setIsModalVisible, ownerId, postId, renderedItemsType}) {

    // upper case just the first letter to make a title
    const title = renderedItemsType[0].toUpperCase() + renderedItemsType.substring(1);

    const [content, setContent] = useState([])

    const fetchData = useCallback(async () => {
        try {
            const fetchedData = await (await fetch(`${DatabaseUrl}/users/${ownerId}/posts/${postId}/${renderedItemsType}.json`)).json()
            
            // fetched Data is hash table, need converting to array for rendering
            const loadedContent = []
            for(const key in fetchedData) {
                loadedContent.unshift(fetchedData[key])
            }
    
            setContent(loadedContent)
            
        } catch (error) {
            console.log(error)
        }

    }, [setContent])

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
                        <View style={{position: 'absolute', bottom: 10, right: 10,}}>
                            <CustomIcon 
                                onPress={() => {setIsModalVisible(false)}}
                                name="close"
                                color={AppColors.mainBlack}
                                size={30}
                            />
                        </View>
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
