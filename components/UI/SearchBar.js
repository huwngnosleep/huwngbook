import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    Button,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'

const SearchBar = ({onPress, style, placeholder, onChangeText, onSubmitEditing, value}) => {

    return(
        <View style={{...styles.container, ...style}}>
            <View style={styles.searchBar}>
                <Icon 
                    size={25}
                    name="search-outline"
                />
                <TextInput 
                    style={{paddingLeft: 5}}
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
        backgroundColor: AppColors.mainGrey,
        paddingLeft: 10,
        paddingVertical: 5,
        borderRadius: 50,
    },
})

export default SearchBar