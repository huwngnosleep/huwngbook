import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Alert,
    Image,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import ActionButton from './ActionButton'
import CustomButton from '../UI/CustomButton'

const AppImagePicker = ({style, onImageTaken, currentImage, canToggle}) => {
    const [image, setImage] = useState(currentImage)

    if(canToggle === true) {
        var [isImagePickerVisible, setIsImagePickerVisible] = useState(false)
    }

    const verifyPermissions = async (type) => {
        let permission
        if(type === 'take') {
            permission = await Permissions.askAsync(Permissions.CAMERA)
        } else {
            permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        }
        
        if(permission.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    const getImageHandler = async (type) => {
        const isPermit = await verifyPermissions(type)
        if(!isPermit) {
            return
        }

        if (type === 'take') {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [9, 6],
                quality: 0.1,
            })
            if (!result.cancelled) {
                setImage(result.uri)
                onImageTaken(result.uri)
            }
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [9, 6],
                quality: 0.1,
            })
            if (!result.cancelled) {
                setImage(result.uri)
                onImageTaken(result.uri)
            }
        }

    }

    if(isImagePickerVisible === false && canToggle === true) {
        return(
            <ActionButton 
                onPress={() => {setIsImagePickerVisible((true))}}
                iconName="images" 
                action="Add image"
                style={{marginVertical: 20}}
            />
        )
    }

    return(
        <View style={{...styles.container, ...style}}>
            {
                image.length > 0 ? 
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    :
                    null
            }
            <View style={styles.buttonsContainer}>
                <CustomButton 
                    style={styles.button}
                    title="Take new photo"
                    onPress={() => getImageHandler('take')}
                />
                <CustomButton 
                    style={styles.button}
                    title="Choose from library"
                    onPress={() => getImageHandler('choose')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    imageContainer: {
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: '#ccc',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        width: '45%',
    },

})

export default AppImagePicker