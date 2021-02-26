import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
} from 'react-native'

const CustomTextInput = (props) => {

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                style={styles.input}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    label: {
        fontSize: 24,
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

export default CustomTextInput