import React from 'react'
import { StyleSheet, 
    View, 
    Text, 
    FlatList, 
} from 'react-native'
import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'

const HomeScreen = (props) => {
    return(
        <View 
            style={styles.screen} >
            <PostStatus />
            <FlatList 
                data={[1,2,3]}
                renderItem={(itemData) => <Post />}
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