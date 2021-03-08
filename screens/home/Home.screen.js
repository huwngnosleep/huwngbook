import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    Button,
    FlatList, 
    ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setNewsFeed } from '../../store/actions/user/post.actions'

import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'

const HomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const newsFeed = useSelector((state) => state.user.newsFeed)
    const localId = useSelector((state) => state.auth.localId)
    const currentUserAvatar = useSelector((state) => state.user.currentUser.avatar)
    
    const dispatch = useDispatch()
    
    const loadNewsFeed = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(setNewsFeed(localId))
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setError, setIsRefreshing, localId])

    useEffect(() => {
        setIsLoading(true)
        loadNewsFeed(localId).then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadNewsFeed, setIsLoading, localId])

    useEffect(() => {
        const focusSubscript = navigation.addListener('focus', loadNewsFeed)
        return focusSubscript
    }, [loadNewsFeed, navigation])

    if (error) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <Button onPress={loadNewsFeed} title='Reload' />
        </View>
    }

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color="black" />
        </View>
    }
    
    return(
        <View 
            style={styles.screen} >
            <PostStatus imageUri={currentUserAvatar} onPress={() => {navigation.navigate('Create Post')}}/>
            <FlatList 
                onRefresh={loadNewsFeed}
                refreshing={isRefreshing}
                data={newsFeed}
                renderItem={(itemData) => 
                    <Post 
                        editable={false}
                        postData={itemData.item}
                        navigation={navigation}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    
})

export default HomeScreen