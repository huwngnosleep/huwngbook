import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    Button,
    ScrollView,
    ActivityIndicator,
    Keyboard,
    TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../../store/actions/auth/auth.actions'
import { setUser } from '../../store/actions/user/user.actions'

import AlertText from '../../components/AlertText'
import CustomTextInput from '../../components/CustomTextInput'

const AuthScreen = ({navigation}) => {
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
                await dispatch(signIn(email, password)).then((id) => {
                    dispatch(setUser(id))
                })
                navigation.navigate('Profile')
            } else {
                await dispatch(signUp(email, password)).then((id) => {
                    dispatch(setUser(id))
                })
                navigation.navigate('Create User', {alertText: 'Signed up successfully!'})
            }
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
        setEmail('')
        setPassword('')
    }, [dispatch, isSignIn, email, password, error])

    return(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.screen}
            onPress={() => {Keyboard.dismiss()}}
        >
            <View style={styles.authContainer}>
                <ScrollView>
                    <CustomTextInput 
                        placeholder="Email"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            setError(null)
                        }}
                    />
                    <CustomTextInput 
                        style={styles.input}
                        placeholder="Password"
                        keyboardType='default'
                        secureTextEntry
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                            setError(null)
                        }}
                    />
                </ScrollView>
                {error ? <AlertText alertText={error}/> : null}
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
                            onPress={() => {
                                setIsSignIn((isSignIn) => !isSignIn)
                                setError(null)
                            }}
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
        marginTop: 10,
    },
    button: {
        marginTop: 10,
    },
})

export default AuthScreen