import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { themeColor } from '../constants'
import { HomeStyles } from './styles'
const AISearch = ({ navigation }) => {
    return (
        <View style={HomeStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themeColor.PRIMARY} />
            <Header navigation={navigation} />
            <Text>AISearch</Text>
        </View>
    )
}

export default AISearch