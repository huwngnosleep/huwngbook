import DeviceDimensions from "./DeviceDimensions"
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    imagePicker: {
        backgroundColor: '#ccc',
        maxHeight: DeviceDimensions.deviceHeight * 0.6,
        maxWidth: DeviceDimensions.deviceWidth * 0.8,
        alignSelf: 'center',
        marginVertical: 20,
    },
})