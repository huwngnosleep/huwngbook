import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import ChatListItem from '../../components/Chat/ChatListItem'
import SearchBar from '../../components/UI/SearchBar'

export default function ChatListScreen ({navigation}) {
    const [searchInput, setSearchInput] = useState('')

    const friends = useSelector((state) => state.user.currentUser.friends)

    useEffect(() => {
        navigation.setOptions({
            title: 'Chat'
        })
    })

    if(friends.length === 0) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Add friend to start chatting...</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen} >
            <SearchBar
                onSubmitEditing={() => {}}
                onChangeText={(text) => setSearchInput(text)}
                value={searchInput}
                placeholder="Chat with a friend..."
                noCancelButton={true}
                style={styles.searchBar}
            />
            <FlatList 
                contentContainerStyle={styles.list}
                data={friends}
                keyExtractor={(item) => item}
                renderItem={(itemData) => 
                    <ChatListItem 
                        onPress={() => {
                            navigation.navigate('Chat Screen', {
                                userId: itemData.item
                            })
                        }}
                        userId={itemData.item}
                    />
                }  
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },  
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    list: {
        paddingTop: 10,
        alignSelf: 'center',
        width: '100%',
    },
})
