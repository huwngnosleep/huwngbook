import React from 'react'
import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import DeviceDimensions from '../constants/DeviceDimensions';
import ActionButton from './ActionButton';
import Avatar from './Avatar'
import CustomImage from './CustomImage';
import InfoBar from './InfoBar';

const Post = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                <InfoBar customText="Date"/>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {}}
                >
                    <Icon 
                        name="ellipsis-horizontal"
                        color="#333"
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text>abcabcabc</Text>
            </View>
            <CustomImage />
            <View style={styles.actionsContainer}>
                <ActionButton style={styles.action} iconName="heart-outline" action="Like"/>
                <ActionButton style={styles.action} iconName="chatbox-ellipses-outline" action="Comment"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DeviceDimensions.deviceWidth * 0.9,
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        width: '50%',
    },
})

export default Post