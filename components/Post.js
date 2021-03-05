import React, { useState } from 'react'
import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
    Modal,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import DeviceDimensions from '../constants/DeviceDimensions';
import ActionButton from './ActionButton';
import CustomImage from './CustomImage';
import InfoBar from './InfoBar';

import { deletePost } from '../store/actions/user/post.actions'
import { useDispatch } from 'react-redux';

const PostDropdownMenu = ({ postId, localId }) => {
    
    const dispatch = useDispatch()

    return(
        <View
            style={styles.postDropdownMenu}
        >
            <ActionButton 
                style={styles.dropdownButton} 
                iconName="pencil" 
                action="Edit"
                onPress={() => {console.log('edit')}}
            />
            <ActionButton 
                style={styles.dropdownButton} 
                iconName="trash" 
                action="Delete"
                onPress={() => {dispatch(deletePost(localId, postId))}}
            />
        </View>
    )
}

const Post = ({localId, postId, mainText, customText, content, imageUri}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                {isDropdownVisible ? <PostDropdownMenu localId={localId} postId={postId}/> : null}
                <InfoBar mainText={mainText} customText={customText}/>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {}}
                >
                    <Icon 
                        onPress={() => setDropdownVisible((prevState) => !prevState)}
                        name="ellipsis-horizontal"
                        color="#333"
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.content}>{content}</Text>
            </View>
            <CustomImage imageUri={imageUri}/>
            <View style={styles.actionsContainer}>
                <ActionButton style={styles.action} iconName="heart-outline" action="Like"/>
                <ActionButton style={styles.action} iconName="chatbox-ellipses-outline" action="Comment"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DeviceDimensions.deviceWidth * 0.9,
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    postDropdownMenu: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 20,
        right: 0,
    },
    dropdownButton: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        justifyContent: 'flex-start',
    },
    content: {
        
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        width: '50%',
    },
})

export default Post