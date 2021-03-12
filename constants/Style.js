import DeviceDimensions from "./DeviceDimensions"
import { StyleSheet } from 'react-native'
import AppColors from "./AppColors"

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
    editPostTextInput: {
        fontSize: 18,
        paddingBottom: 20,
    },
    postStatusListItemContainer: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomEndRadius: 10,
        borderColor: AppColors.mainGrey,
        overflow: 'hidden',
        padding: 10,
    },
})