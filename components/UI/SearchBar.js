import React from 'react'
import { 
    StyleSheet, 
    View, 
    TextInput,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AppColors from '../../constants/AppColors'
import CustomButton from './CustomButton'

export default function SearchBar ({
    onCancelPress = () => {}, 
    style, 
    placeholder, 
    onChangeText, 
    onSubmitEditing, 
    value,
    noCancelButton = false,
}) {

    return(
        <View style={{...styles.container, ...style}}>
            <View style={styles.searchBar}>
                <Icon 
                    size={25}
                    name="search-outline"
                />
                <View style={styles.inputContainer}>
                    <TextInput 
                        value={value}
                        onSubmitEditing={onSubmitEditing}
                        onChangeText={onChangeText} 
                        placeholder={placeholder} 
                    />
                </View>
            </View>
            {
                noCancelButton === true ?
                    null
                    :
                    <CustomButton
                        onPress={onCancelPress}
                        title="Cancel"
                        style={styles.cancelButton}
                    />
            }
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
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        marginLeft: 10,
        paddingHorizontal: 7,
    },
})
