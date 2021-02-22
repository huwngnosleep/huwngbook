import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Touchable,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Avatar from './Avatar'

const InfoBar = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={{...styles.container, ...props.style}}>
            <Avatar />
            <View>
                <Text style={styles.name}>Name</Text>
                <Text style={styles.date}>{props.customText}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    date: {
        fontSize: 12,
        fontWeight: '200',
    },
})

export default InfoBar