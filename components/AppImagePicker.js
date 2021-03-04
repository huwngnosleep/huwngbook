import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Alert,
    Image,
    Button,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const AppImagePicker = ({style}) => {
    const [image, setImage] = useState()

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
                aspect: [16, 9],
                quality: 1,
            })
            setImage(result.uri)
            props.onImageTaken(result.uri)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (!result.cancelled) {
                setImage(result.uri)
            }
        }

    }
    return(
        <View style={{...styles.container, ...style}}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={styles.buttonsContainer}>
                <Button 
                    title="Take new photo"
                    onPress={() => getImageHandler('take')}
                />
                <Button 
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
        justifyContent: 'space-between',
    },

})

export default AppImagePicker