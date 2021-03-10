import DeviceDimensions from "./DeviceDimensions"
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    imagePicker: {
        height: DeviceDimensions.deviceHeight * 0.6,
        width: DeviceDimensions.deviceWidth * 0.8,
        alignSelf: 'center',
        marginVertical: 20,
    },
    headerRightButtonStyle: {
        marginRight: 10,
        paddingHorizontal: 5,
    },
})