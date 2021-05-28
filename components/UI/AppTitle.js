import React from 'react'
import { 
    Text,
} from 'react-native'
import AppColors from '../../constants/AppColors'

const AppTitle = () => {
    return(
        <Text style={{
            flex: 1,
            fontSize: 26, 
            color: 
            AppColors.mainGreyBolder, 
            fontWeight: 'bold',
        }}>
            FingerBook
        </Text>
    )
}

export default AppTitle