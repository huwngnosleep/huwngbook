import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editProfileImage } from '../../store/actions/user/user.actions'

import AppImagePicker from '../../components/AppImagePicker'
import DeviceDimensions from '../../constants/DeviceDimensions'
import HeaderRightButtonStyle from '../../constants/HeaderRightButtonStyle'


const EditImageScreen = ({navigation}) => {
    const localId = useSelector((state) => state.auth.localId)
    const currentUserImage = useSelector((state) => state.user.currentUser.avatar)
    
    const [image, setImage] = useState(currentUserImage)


    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        dispatch(editProfileImage(image, localId))
        navigation.goBack()
    }, [dispatch, image])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{...HeaderRightButtonStyle}}>
                    <Button 
                        title="Save"
                        onPress={submitHandler}
                    />
                </View>
            )
        })
    })

    return(
        <View style={styles.screen} >
            <Text style={styles.title}>Your image here</Text>
            <AppImagePicker 
                onImageTaken={(imageUri) => setImage(imageUri)}
                currentImage={image}
                style={styles.imagePicker}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    imagePicker: {
        height: DeviceDimensions.deviceWidth * 0.8,
        width: DeviceDimensions.deviceWidth * 0.8,
    },
})

export default EditImageScreen