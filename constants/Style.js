import DeviceDimensions from "./DeviceDimensions"
import { StyleSheet } from 'react-native'
import AppColors from "./AppColors"

export default StyleSheet.create({
    imagePicker: {
        minHeight: DeviceDimensions.deviceHeight * 0.8,
        width: DeviceDimensions.deviceWidth * 0.9,
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
    dividerStyle: {
        backgroundColor: AppColors.mainGreyBolder, 
        width: "90%", 
        alignSelf: 'center',
        marginVertical: 15,
    },
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})