import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    RefreshControl,
    ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DatabaseUrl from '../../constants/DatabaseUrl'
import Post from '../../components/User/Post'
import PostCreator from '../../components/User/PostCreator'
import SearchBar from '../../components/UI/SearchBar'
import { Badge } from 'react-native-elements'
import AppTitle from '../../components/UI/AppTitle'
import PostModel from '../../models/post.model'
import CustomIcon from '../../components/UI/CustomIcon'
import LoadingCircle from '../../components/UI/LoadingCircle'
import CustomKeyboardAvoidView from '../../components/UI/CustomKeyboardAvoidView'


const SearchHeaderBar = ({navigation}) => {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const pendingFriendRequests = useSelector((state) => state.user.currentUser.pendingFriendRequests)
    
    const onSearchSubmitHandler =  async (input) => {
        try {
            const submittedInput = input.trim().toLowerCase()
            const response = await fetch(`${DatabaseUrl}/users.json`)
            const userResData = await response.json()
            
            for(const key in userResData) {
                const fetchedName = userResData[key].name.trim().toLowerCase()
                const fetchedUserName = userResData[key].userName.trim().toLowerCase()

                if(fetchedName.indexOf(submittedInput) !== -1) {

                    setSearchResult(searchResult.push(userResData[key]))

                } else if(fetchedUserName.indexOf(submittedInput) !== -1) {

                    setSearchResult(searchResult.trim().push(userResData[key]))

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
                <AppTitle />
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
                        placeholder="Who are you looking for?"
                        onCancelPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                    />
                    :
                    <View style={{flexDirection: 'row'}}>
                        <CustomIcon 
                            name="search-outline"
                            size={30}
                            onPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                        />
                        <View>
                            <CustomIcon 
                                name="people-outline"
                                size={30}
                                onPress={() => {navigation.navigate('Friend Requests')}}
                                />
                            {
                                pendingFriendRequests.length > 0 ?
                                    <Badge value="" status="error" containerStyle={styles.badgeStyle} />
                                    :
                                    null
                            }
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default function HomeScreen ({navigation}) {
    // get friendsList for fetching news feed
    const friendsList = useSelector((state) => state.user.currentUser.friends)

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [newsFeed, setNewsFeed] = useState([])
    
    const localId = useSelector((state) => state.auth.localId)
    const currentUserAvatar = useSelector((state) => state.user.currentUser.avatar)
    
    const dispatch = useDispatch()
    
    const fetchNewsFeed = useCallback(async () => {
        setIsRefreshing(true)

        try {
            
            const currentUserPosts = await (await fetch(`${DatabaseUrl}/users/${localId}/posts.json`)).json()
            const loadedCurrentUserPosts = []
            for(const post in currentUserPosts) {
                loadedCurrentUserPosts.push(new PostModel(currentUserPosts[post]))
            }            
    
            const loadedFriendsPosts = []
            for(const friend in friendsList) {
                const eachFriendPosts = await (await fetch(`${DatabaseUrl}/users/${friendsList[friend]}/posts.json`)).json()
                for(const post in eachFriendPosts) {
                    loadedFriendsPosts.push(new PostModel(eachFriendPosts[post]))
                }
            }
    
            const totalLoadedPosts = loadedFriendsPosts.concat(loadedCurrentUserPosts)
            totalLoadedPosts.sort((post1, post2) => 
                Date.parse(post2.date.substring(8)) - Date.parse(post1.date.substring(8))
            )
            
            setNewsFeed(totalLoadedPosts)
        } catch (error) {
            console.log(error)
        }
        setIsRefreshing(false)
    }, [setIsRefreshing, setNewsFeed])
    
    useEffect(() => {
        setIsLoading(true)
        fetchNewsFeed().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, fetchNewsFeed, setIsLoading])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchNewsFeed)
        return unsubscribe
    })

    if (isLoading) {
        return <LoadingCircle />
    }
    
    return(
        <CustomKeyboardAvoidView style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.newsFeed}
            >
                <RefreshControl 
                    onRefresh={fetchNewsFeed}
                    refreshing={isRefreshing}
                />
                <SearchHeaderBar navigation={navigation}/>
                <PostCreator imageUri={currentUserAvatar} onPress={() => {navigation.navigate('Create Post')}}/>
                {
                    newsFeed.length > 0 ?
                        newsFeed.map((item) =>
                            <Post 
                                key={item.postId}
                                editable={false}
                                postData={item}
                                navigation={navigation}
                            />
                        )
                        :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Let's add friend or create a new post!</Text>
                        </View>
                }
            </ScrollView>
        </CustomKeyboardAvoidView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    newsFeed: {
        alignItems: 'center',
    },
    badgeStyle: {
        position: 'absolute',
        top: -2,
        right: -2,
    },
})
