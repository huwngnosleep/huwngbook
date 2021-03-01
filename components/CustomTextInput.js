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
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                textAlignVertical={'top'}
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
        marginBottom: 30,
    },
    label: {
        fontSize: 22,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 16,
        textAlign: 'right',
    },
})

export default CustomTextInput