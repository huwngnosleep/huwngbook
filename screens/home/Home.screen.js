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
import * as postActions from '../../store/actions/posts.actions'

import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'

const HomeScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const posts = useSelector((state) => state.post.posts)
    
    const dispatch = useDispatch()
    
    const loadPosts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(postActions.setPosts())
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setError, setIsRefreshing])

    useEffect(() => {
        setIsLoading(true)
        loadPosts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadPosts, setIsLoading])

    if (error) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <Button onPress={loadPosts} title='Reload' />
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
            <PostStatus onPress={() => {props.navigation.navigate('Create Post')}}/>
            <FlatList 
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                renderItem={(itemData) => 
                    <Post 
                        mainText={itemData.item.owner}
                        customText={itemData.item.date}
                        imageUri={itemData.item.imageUri}
                        content={itemData.item.content}
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