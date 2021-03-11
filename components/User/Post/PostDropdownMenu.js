import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as firebase from 'firebase'

import AppColors from '../../../constants/AppColors'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import ActionButton from '../ActionButton'

const PostDropdownMenu = ({ postData, navigation, editable }) => {
    const { postId } = postData

    const localId = useSelector((state) => state.auth.localId)

    const deleteButtonHandler = async () => {
        await fetch(`${DatabaseUrl}/users/${localId}/posts/${postId}.json`, {
            method: 'DELETE'
        })

        // try deleting post image in storage
        if(postData.imageUri) {
            const storageRef = firebase.storage().ref().child(`${localId}/posts/${postId}`)
            storageRef.delete()
        }

        Alert.alert('Deleted')
        navigation.goBack()
        navigation.navigate('Profile')
    }

    if(editable === true) {
        return(
            <View
                style={styles.postDropdownMenu}
            >
                <ActionButton 
                    style={styles.dropdownButton} 
                    iconName="pencil" 
                    action="Edit"
                    onPress={() => {navigation.navigate('Edit Post', {postData})}}
                />
                <ActionButton 
                    style={styles.dropdownButton} 
                    iconName="trash" 
                    action="Delete"
                    onPress={() => {
                        Alert.alert(
                            'Wait!!!',
                            'Are you sure?',
                            [
                                {
                                    text: 'Cancel',
                                },{
                                    text: 'Delete', 
                                    style: 'destructive',
                                    onPress: deleteButtonHandler
                                }
                            ]
                        )
                    }}
                />
            </View>
        )
    }
    return(
        <View
            style={styles.postDropdownMenu}
        >
            <ActionButton 
                style={styles.dropdownButton} 
                iconName="bookmark" 
                action="Save"
                onPress={() => {}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
        borderBottomColor: AppColors.mainGrey,
        justifyContent: 'flex-start',
    },
})

export default PostDropdownMenu