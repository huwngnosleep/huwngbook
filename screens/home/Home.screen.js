import React from 'react'
import { StyleSheet, 
    View, 
    Text, 
    FlatList, 
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'

const HomeScreen = (props) => {
    return(
        <ScrollView 
            contentContainerStyle={styles.screen} >
            <PostStatus />
            <FlatList 
                data={[1,2,3]}
                renderItem={(itemData) => <Post />}
            />
        </ScrollView>
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