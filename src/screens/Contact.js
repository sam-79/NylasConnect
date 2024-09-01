import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { CUSTOM_MARGIN, themeColor } from '../constants'
import { HomeStyles as styles} from './styles'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-ui-lib'

const Contact = ({ navigation }) => {

    const { grantidlist } = useSelector(state => state.grants)

    if (!grantidlist) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
                <StatusBar barStyle="light-content" backgroundColor={themeColor.PRIMARY} />
                <View style={{position:'absolute', top:CUSTOM_MARGIN/2, right:CUSTOM_MARGIN/2, left:CUSTOM_MARGIN/2}}>
                    <Header isDrawer={false} navigation={navigation} />
                </View>
                <View center style={{ alignSelf: 'center' }}>
                    <View>
                        <Text>Please go to profile section and add API key</Text>
                    </View>

                    <Button label={'Go to Profile'} onPress={() => navigation.navigate(APP_SCREENS.USERPROFILE, { source: APP_SCREENS.INBOX })} />
                </View>

            </SafeAreaView>
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themeColor.PRIMARY} />
            <Header navigation={navigation} />
            <Text>Contact</Text>
        </View>
    )
}

export default Contact