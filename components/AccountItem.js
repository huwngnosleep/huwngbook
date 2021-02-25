import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from './ActionButton';

const AccountItem = (props) => {
    return(
        <View style={styles.container} activeOpacity={1}>
            <ActionButton 
                onPress={props.onPress}
                iconName={props.iconName} 
                action={props.action}
            />
            {props.haveRightArrow ? <Icon 
                name="chevron-down"
                color="#333"
                size={25}
            /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
})

export default AccountItem