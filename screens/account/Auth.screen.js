import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    Button,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    Touchable,
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth.actions'

const AuthScreen = (props) => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const authHandler = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            if (isSignIn === true) {
                await dispatch(authActions.signIn(email, password))
            } else {
                await dispatch(authActions.signUp(email, password))
            }
            
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
        setEmail('')
        setPassword('')
    }, [dispatch, email, password])

    return(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.screen}
            onPress={() => {Keyboard.dismiss()}}
        >
            <View style={styles.authContainer}>
                <ScrollView>
                    {error ? <Text>{error}</Text> : null}
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='email-address'
                        value={email}
                        required
                        email
                        autoCapitalize='none'
                        placeholder="example@gmail.com"
                        onChangeText={(text) => {setEmail(text)}}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='default'
                        value={password}
                        secureTextEntry
                        required
                        autoCapitalize='none'
                        placeholder="Don't let anyone know"
                        onChangeText={(text) => {setPassword(text)}}
                    />
                </ScrollView>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        {isLoading ? 
                            <ActivityIndicator size="small" color="black"/> 
                            : 
                            <Button 
                                title={isSignIn ? 'Sign in' : 'Sign up'} 
                                onPress={authHandler} 
                            />
                        }
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title={`Switch to ${isSignIn ? 'Sign up' : 'Sign in' }`} 
                            onPress={() => {setIsSignIn((isSignIn) => !isSignIn)}} 
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    authContainer: {
        padding: 10,
        width: '80%',
        maxWidth: 400,
        maxHeight: '50%',
        maxHeight: 400,
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
    buttonsContainer: {
        marginTop: 20,
    },
    button: {
        marginTop: 10,
    },
})

export default AuthScreen