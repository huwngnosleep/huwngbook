import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator,
    RefreshControl,
    ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setNewsFeed } from '../../store/actions/user/post.actions'

import Post from '../../components/User/Post'
import PostStatus from '../../components/User/PostStatus'
import SearchBar from '../../components/UI/SearchBar'

import Icon from 'react-native-vector-icons/Ionicons'
import DatabaseUrl from '../../constants/DatabaseUrl'
import AppColors from '../../constants/AppColors'
import CustomButton from '../../components/UI/CustomButton'
import { Badge } from 'react-native-elements'
import AppTitle from '../../components/UI/AppTitle'


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
            <CustomButton onPress={loadNewsFeed} title='Reload' />
        </View>
    }

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
                onRefresh={loadNewsFeed}
                refreshing={isRefreshing}
            />
            <SearchHeaderBar navigation={navigation}/>
            <PostStatus imageUri={currentUserAvatar} onPress={() => {navigation.navigate('Create Post')}}/>
            {
                newsFeed.length > 0 ?
                    newsFeed.map((item) =>
                        <Post 
                            key={item.id}
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