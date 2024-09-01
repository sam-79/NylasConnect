import { StyleSheet } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';
//screen

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarScreen from '../screens/Calender';
import Contact from '../screens/Contact';
import AISearch from '../screens/AISearch';
import Inbox from '../screens/Inbox';
import InboxNavigator from './InboxNavigator';
import { APP_SCREENS, themeColor } from '../constants';
import CalenderNavigator from './CalenderNavigator';
const TabNavigator = createBottomTabNavigator();



const TabNavigation = () => {

    const { userData } = useSelector(state => state.auth);



    return (
        <TabNavigator.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === APP_SCREENS.INBOXNAVIGATOR) {
                    iconName = focused
                        ? 'email'
                        : 'email-outline';
                } else if (route.name === APP_SCREENS.AISEARCH) {
                    iconName = focused ? 'magnify' : 'magnify';
                } else if (route.name === APP_SCREENS.CALENDERNAVIGATOR) {
                    iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === APP_SCREENS.CONTACT) {
                    iconName = focused ? 'contacts' : 'contacts-outline';
                }

                // You can return any component that you like here!
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: themeColor.PRIMARY,
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })} >
            <TabNavigator.Screen name={APP_SCREENS.INBOXNAVIGATOR} component={InboxNavigator} options={{  tabBarLabel: "Inbox" }} />
            {/* <TabNavigator.Screen name={APP_SCREENS.AISEARCH} component={AISearch} /> */}
            <TabNavigator.Screen name={APP_SCREENS.CALENDERNAVIGATOR} component={CalenderNavigator} options={{ tabBarLabel: "Calender" }} />
            <TabNavigator.Screen name={APP_SCREENS.CONTACT} component={Contact} />
        </TabNavigator.Navigator>
    )
}

export default TabNavigation