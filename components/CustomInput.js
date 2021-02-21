import React from 'react'
import { 
    StyleSheet, 
    View,
    TextInput,
} from 'react-native'

const CustomInput = (props) => {
    return(
        <View style={styles.inputContainer} >
            <TextInput 
                style={styles.input}
                placeholder={props.placeholder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: '80%',
        width: '60%',
        borderColor: 'grey',
        borderBottomWidth: 1,
    },
    input: {
        height: '100%',
        width: '100%',
    },
})

export default CustomInput