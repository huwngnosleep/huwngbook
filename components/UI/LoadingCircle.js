import React from 'react'
import { 
    View, 
    Text,
    ActivityIndicator,
} from 'react-native'
import AppColors from '../../constants/AppColors'

export default function LoadingCircle ({color = AppColors.mainBlack, size = "small"}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={color} size={size}/>
        </View>
    )
}
