import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    Button,
    FlatList, 
    ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setNewsFeed } from '../../store/actions/user/post.actions'

import Post from '../../components/Post'
import PostStatus from '../../components/PostStatus'
import SearchBar from '../../components/SearchBar'
import Icon from 'react-native-vector-icons/Ionicons'
import DatabaseUrl from '../../constants/DatabaseUrl'

const SearchHeaderBar = ({navigation}) => {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const onSearchSubmitHandler =  async (input) => {
        try {
            const response = await fetch(`${DatabaseUrl}/users.json`)
            const resData = await response.json()
            for(const key in resData) {
                const fetchedName = resData[key].name.trim().toLowerCase()
                const fetchedUserName = resData[key].userName.trim().toLowerCase()
                if(fetchedName.indexOf(input.toLowerCase()) !== -1) {
                    setSearchResult(searchResult.push(resData[key])) 
                } else if(fetchedUserName.indexOf(input.toLowerCase()) !== -1) {
                    setSearchResult(searchResult.push(resData[key]))
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const focusSubs = navigation.addListener('focus', () => {
            setSearchInput('')
            setSearchResult([])
        })   
        return focusSubs
    }, [setSearchInput, setSearchResult])

    return(
        <View style={{width: '90%', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1,fontSize: 26, color: 'grey', fontWeight: 'bold'}}>HuwngBook</Text>
                {isSearchBarVisible ?
                    <SearchBar
                        onChangeText={(text) => setSearchInput(text)}
                        onSubmitEditing={async () => {
                            if(searchInput.length === 0) {
                                return
                            }
                            await onSearchSubmitHandler(searchInput)
                            navigation.navigate('Search Result', {
                                searchedData: searchResult
                            })
                        }}
                        value={searchInput}
                        placeholder="What are you looking for?"
                        onPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                    />
                    :
                    <View style={{flexDirection: 'row'}}>
                        <Icon 
                            name="search-outline"
                            size={30}
                            onPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

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
            <SearchHeaderBar navigation={navigation}/>
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