import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text,
    Modal,
    Button,
    TextInput,
} from 'react-native'
import DeviceDimensions from '../../constants/DeviceDimensions'
import ActionButton from '../../components/ActionButton'
import InfoBar from '../../components/InfoBar'

const CreatePostScreen = (props) => {
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRightButton}>
                    <Button 
                        disabled={textInput === '' ? true : false}
                        title="Post"
                        onPress={() => {}}
                    />
                </View>
            )
        })
    })

    return(
        <View 
            style={styles.container}
        >
            <View style={styles.header}>
                <InfoBar mainText="User Name" customText={new Date().toDateString()}/>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="   What's on your mind?"
                    onChangeText={(text) => {setTextInput(text)}}
                    value={textInput}
                />
            </View>
            <View style={styles.footer}>
                <ActionButton iconName="images" action="Images"/>
                <ActionButton iconName="pricetags" action="Friends"/>
                <ActionButton iconName="happy" action="Feeling"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRightButton: {
        marginRight: 10,
    },
    header: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    textInputContainer: {
        width: '90%',
        height: DeviceDimensions.deviceHeight / 3,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 10,
    },
    textInput: {
        fontSize: 18,
    },
    footer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})

export default CreatePostScreen