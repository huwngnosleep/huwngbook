import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    Button,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

const SearchBar = ({onPress, style, placeholder, onChangeText, onSubmitEditing, value}) => {

    return(
        <View style={{...styles.container, ...style}}>
            <View style={styles.searchBar}>
                <Icon 
                    size={25}
                    name="search-outline"
                />
                <TextInput 
                    value={value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeText} 
                    placeholder={placeholder} 
                />
            </View>
            <View style={styles.cancelButton}>
                <Button 
                    
                    onPress={onPress}
                    title="Cancel"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ccc',
        paddingLeft: 10,
        paddingVertical: 5,
        borderRadius: 50,
    },
})

export default SearchBar