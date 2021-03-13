import React from 'react'
import { 
    KeyboardAvoidingView,
    Platform,
} from 'react-native'

export default function CustomKeyboardAvoidView ({children, style}) {

    if(Platform.OS === 'ios') {
        return(
            <KeyboardAvoidingView 
                behavior="position"
                keyboardVerticalOffset={50}
                style={style}
            >
                {children}
            </KeyboardAvoidingView>
        )
    }
    return(
        <KeyboardAvoidingView style={style}>
                {children}
            </KeyboardAvoidingView>
    )
}
