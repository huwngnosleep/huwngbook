import React from 'react'
import {
    StyleSheet,
    View,
    Text, 
    TextInput,
} from 'react-native'

const CustomTextInput = (props) => {

    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor='grey'
                style={styles.input}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 40,
        marginBottom: 20,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 22,
    },
})

export default CustomTextInput