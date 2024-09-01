import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calender1 from '../screens/Calender';
import EventViewer from '../screens/EventViewer';
import { APP_SCREENS } from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatCalender from '../screens/ChatCalender';


const Stack = createNativeStackNavigator()

const CalenderNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={APP_SCREENS.CALENDER}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={APP_SCREENS.CALENDER}
                component={Calender1}
            />
            <Stack.Screen
                name={APP_SCREENS.EVENTVIEWER}
                component={EventViewer}
                options={{ unmountOnBlur: true, }}
            />

            <Stack.Screen
                name={APP_SCREENS.CHATCALENDER}
                component={ChatCalender}
                options={{ unmountOnBlur: true, }}
            />
        </Stack.Navigator>
    );
};

export default CalenderNavigator;
