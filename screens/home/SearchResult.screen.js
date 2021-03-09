import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
    Button,
} from 'react-native'
import InfoBar from '../../components/InfoBar'
import DeviceDimensions from '../../constants/DeviceDimensions'

const SearchResultScreen = ({route, navigation}) => {
    const { searchedData } = route.params
    
    if(searchedData.length === 0) {
        return <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Text>Can't find any matched user!!!</Text>
        </View>
    }

    return(
        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={searchedData}
                keyExtractor={(item) => item.idToken}
                renderItem={(itemData) =>
                    <View style={styles.listItem}>
                        <InfoBar 
                            onPress={() => {navigation.navigate('Other Profile', {
                                userId: itemData.item.localId
                            })}}
                            imageUri={itemData.item.avatar}
                            mainText={itemData.item.name}
                            customText={itemData.item.userName}
                        />
                        <Button 
                            title="Add"
                            onPress={() => {}}
                        />
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    list: {
        marginTop: 20,
        width: DeviceDimensions.deviceWidth,
        alignSelf: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: DeviceDimensions.deviceWidth * 0.8,        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
})

export default SearchResultScreen