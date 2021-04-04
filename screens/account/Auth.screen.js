import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    View, 
    ScrollView,
    Text,
    KeyboardAvoidingView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../../store/actions/auth/auth.actions'
import { setUser } from '../../store/actions/user/user.actions'

import AlertText from '../../components/UI/AlertText'
import CustomTextInput from '../../components/UI/CustomTextInput'

import AppColors from '../../constants/AppColors'
import CustomButton from '../../components/UI/CustomButton'
import AppTitle from '../../components/UI/AppTitle'

export default function AuthScreen ({navigation}) {
    const [isSignIn, setIsSignIn] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [error, setError] = useState()

    const dispatch = useDispatch()

    const authHandler = useCallback(async () => {
        setError(null)
        if(!isSignIn && password !== passwordAgain) {
            setError('Passwords you entered are not matched!')
            setPassword('')
            setPasswordAgain('')
            return
        }
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
        setPassword('')
    }, [dispatch, isSignIn, email, password, passwordAgain, error])

    return(
        <KeyboardAvoidingView style={styles.screen}>
            <View style={styles.authContainer}>
                <ScrollView>
                    <AppTitle />
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
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                            setError(null)
                        }}
                    />
                    {
                        isSignIn ? 
                            null
                            :
                            <CustomTextInput 
                                placeholder="Enter your password again"
                                secureTextEntry={true}
                                autoCapitalize='none'
                                value={passwordAgain}
                                onChangeText={(text) => {
                                    setPasswordAgain(text)
                                    setError(null)
                                }}
                            />
                    }
                </ScrollView>
                {error ? <AlertText alertText={error}/> : null}
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <CustomButton 
                            title={
                                isSignIn ? 
                                    'Sign in' 
                                    : 
                                    'Sign up'
                            } 
                            onPress={authHandler}
                        />
                    </View>
                    <View style={styles.button}>
                        <CustomButton 
                            notNeedDisable
                            title={
                                isSignIn ?
                                    'Create new account'
                                    :
                                    'Already have an account?'
                            } 
                            onPress={() => {
                                setIsSignIn((isSignIn) => !isSignIn)
                                setError(null)
                            }}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        borderBottomColor: AppColors.mainGrey,
        borderBottomWidth: 1,
    },
    buttonsContainer: {
        marginTop: 10,
    },
    button: {
        marginTop: 10,
    },
})
