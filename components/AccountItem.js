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
        <TouchableOpacity style={styles.container} >
            <ActionButton iconName={props.iconName} action={props.action}/>
            <Icon 
                name="chevron-down"
                color="#333"
                size={25}
            />
        </TouchableOpacity>
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