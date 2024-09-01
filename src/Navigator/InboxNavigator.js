import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inbox from '../screens/Inbox';
import EmailViewer from '../screens/EmailViewer';
import { APP_SCREENS } from '../constants';
import EmailCompose from '../screens/EmailCompose';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator()

const InboxNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={APP_SCREENS.INBOX}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={APP_SCREENS.INBOX}
                component={Inbox}
            />
            <Stack.Screen
                name={APP_SCREENS.EMAILVIEWER}
                component={EmailViewer}
                options={{
                    // headerShown: true,
                    // // headerTransparent: true,
                    // headerTitle: "",
                    // // headerLeft:{},
                    // headerRight: () => <MaterialCommunityIcons name='chevron-right' backgroundColor={'transparent'} size={30} color={'black'} onPress={() => { }} />

                }}
            />

            <Stack.Screen
                name={APP_SCREENS.EMAILCOMPOSE}
                component={EmailCompose}
            />
        </Stack.Navigator>
    );
};

export default InboxNavigator;
