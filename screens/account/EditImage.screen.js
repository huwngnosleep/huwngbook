import React, { useEffect, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editProfileImage } from '../../store/actions/user/user.actions'

import AppImagePicker from '../../components/User/AppImagePicker'

import Style from '../../constants/Style'
import CustomButton from '../../components/UI/CustomButton'


export default function EditImageScreen ({navigation, route}) {
    const localId = useSelector((state) => state.auth.localId)
    const { currentUserImage, imageType } = route.params
    
    const [image, setImage] = useState(currentUserImage)

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        dispatch(editProfileImage(imageType, image, localId))
        navigation.goBack()
    }, [dispatch, image])

    useEffect(() => {
        return navigation.setOptions({
            headerRight: () => (
                <CustomButton
                    title="Save"
                    onPress={submitHandler}
                    style={Style.headerRightButtonStyle}
                />
            )
        })
    })

    return(
        <View style={styles.screen} >
            <AppImagePicker 
                onImageTaken={(imageUri) => setImage(imageUri)}
                currentImage={image}
                style={Style.imagePicker}
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
    },
})
