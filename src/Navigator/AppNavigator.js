import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//screen
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import CustomDrawer from '../components/CustomDrawer';
import TabNavigation from './TabNavigator';
import AddAccount from '../screens/AddAccount';
import { APP_SCREENS } from '../constants';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserProfile from '../screens/UserProfile';

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    // const userData = false;
    const { userData } = useSelector(state => state.auth);
    const { grantidlist } = useSelector(state => state.grants)



    //console.log( '🚀 ~ file: AppNavigation.js:23 ~ AppNavigation ~ userData:', userData,);
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{ headerShown: false }}  initialRouteName={APP_SCREENS.TABNAVIGATION}
            // <Drawer.Navigator screenOptions={{ headerShown: false }}  initialRouteName={grantidlist?APP_SCREENS.TABNAVIGATION:APP_SCREENS.ADDACCOUNT}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                {userData ? (
                    <Drawer.Group >
                        <Drawer.Screen name={APP_SCREENS.TABNAVIGATION} component={TabNavigation} options={{
                            title: APP_SCREENS.TABNAVIGATION,
                            headerShown: false
                        }} />
                        <Drawer.Screen name={APP_SCREENS.ADDACCOUNT} component={AddAccount} options={{
                            title: APP_SCREENS.ADDACCOUNT,
                            // headerShown: true,
                            // headerTitle: "",
                            // headerLeft: () => <MaterialCommunityIcons.Button name='chevron-left' backgroundColor={'transparent'} size={30} color={'black'} onPress={() => { }} />

                        }} />
                        <Drawer.Screen name={APP_SCREENS.USERPROFILE} component={UserProfile} options={{
                            title: APP_SCREENS.USERPROFILE,
                            unmountOnBlur: true,
                            // headerShown: true,
                            // headerTitle: "",
                            // headerLeft: () => <MaterialCommunityIcons.Button name='chevron-left' backgroundColor={'transparent'} size={30} color={'black'} onPress={() => { }} />

                        }} unmountOnBlur={true} />
                    </Drawer.Group>

                ) : (
                    <Drawer.Group>
                        <Drawer.Screen name={APP_SCREENS.SIGNIN} component={Signin} />
                        <Drawer.Screen name={APP_SCREENS.SIGNUP} component={Signup} />
                        <Drawer.Screen name={APP_SCREENS.OTPVERIFY} component={OTPVerifyScreen} />
                    </Drawer.Group>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;

const styles = StyleSheet.create({});