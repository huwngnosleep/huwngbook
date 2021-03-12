import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    ActivityIndicator,
    RefreshControl,
    ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Post from '../../components/User/Post'
import PostStatus from '../../components/User/PostStatus'
import SearchBar from '../../components/UI/SearchBar'

import Icon from 'react-native-vector-icons/Ionicons'
import DatabaseUrl from '../../constants/DatabaseUrl'
import AppColors from '../../constants/AppColors'
import { Badge } from 'react-native-elements'
import AppTitle from '../../components/UI/AppTitle'
import PostModel from '../../models/post.model'


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
                        onPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                    />
                    :
                    <View style={{flexDirection: 'row'}}>
                        <Icon 
                            name="search-outline"
                            size={30}
                            onPress={() => {setIsSearchBarVisible((prevState) => !prevState)}}
                        />
                        <View>
                            <Icon 
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

const HomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [newsFeed, setNewsFeed] = useState([])
    
    const localId = useSelector((state) => state.auth.localId)
    const currentUserAvatar = useSelector((state) => state.user.currentUser.avatar)
    
    const dispatch = useDispatch()
    
    const fetchNewsFeed = useCallback(async () => {
        setIsRefreshing(true)

        const currentUserPosts = await (await fetch(`${DatabaseUrl}/users/${localId}/posts.json`)).json()

        const loadedPosts = []
        for(const post in currentUserPosts) {
            loadedPosts.unshift(new PostModel(currentUserPosts[post]))
        }
        
        const friendsList = await (await fetch(`${DatabaseUrl}/users/${localId}/friends.json`)).json()

        const loadedFriendsPosts = []

        for(const friend in friendsList) {
            const eachFriendPosts = await (await fetch(`${DatabaseUrl}/users/${friendsList[friend]}/posts.json`)).json()

            for(const post in eachFriendPosts) {
                loadedFriendsPosts.unshift(new PostModel(eachFriendPosts[post]))
            }
        }

        const totalLoadedPosts = loadedFriendsPosts.concat(loadedPosts)
        totalLoadedPosts.sort((post1, post2) => 
            Date.parse(post2.date.substring(8)) - Date.parse(post1.date.substring(8))
        )
        
        setNewsFeed(totalLoadedPosts)
        setIsRefreshing(false)
    }, [setIsRefreshing, setNewsFeed])
    
    useEffect(() => {
        setIsLoading(true)
        fetchNewsFeed().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, fetchNewsFeed, setIsLoading])
    


    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={AppColors.mainBlack}/>
        </View>
    }
    
    return(
        <ScrollView 
            contentContainerStyle={styles.screen} 
        >
            <RefreshControl 
                onRefresh={fetchNewsFeed}
                refreshing={isRefreshing}
            />
            <SearchHeaderBar navigation={navigation}/>
            <PostStatus imageUri={currentUserAvatar} onPress={() => {navigation.navigate('Create Post')}}/>
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
                    <Text>Let's add friend or create a new post!</Text>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
})

export default HomeScreen