import React, { useContext, useState } from 'react'
import { View, Text, Linking, Image, Platform, Alert } from 'react-native'

import {
    DrawerContentScrollView, DrawerItem, DrawerView
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import { deleteHost } from "../../redux/features/hostnameSlice"
import Divider from './Divider';
import { ALL_ACCOUNTS, APP_SCREENS, INBOX_LABEL, themeColor } from '../constants';
import { changeSelectedAccount } from '../../redux/features/globalReducer';
import { changeInboxLabel } from '../../redux/features/inboxSlice';


export const getEmailProviderIcon = (email) => {
    const domain = email.split('@')[1].toLowerCase();

    switch (domain) {
        case 'gmail.com':
            return 'google'; // Google/Gmail icon
        case 'yahoo.com':
        case 'ymail.com':
        case 'rocketmail.com':
            return 'yahoo'; // Yahoo Mail icon
        case 'outlook.com':
        case 'hotmail.com':
        case 'live.com':
        case 'msn.com':
            return 'microsoft-outlook'; // Microsoft/Outlook/Hotmail icon
        case 'icloud.com':
        case 'me.com':
        case 'mac.com':
            return 'apple'; // Apple/iCloud icon
        default:
            return 'email'; // Generic email icon
    }
};



function CustomDrawer(props) {

    const { userData } = useSelector(state => state.auth);
    const { value } = useSelector(state => state.hostname);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const { grantidlist, isLoading } = useSelector(state => state.grants)
    // console.log(grantidlist)
    const { activeInboxLabel } = useSelector(state => state.inbox)
    const { selectedAccount } = useSelector(state => state.global)


    const onClickDrawerElement = (action, payload) => {
        if (payload == "screen") {
            navigation.navigate(action);
        } else if (payload = "dispatch") {
            dispatch(action)
        }
        navigation.dispatch(DrawerActions.closeDrawer());
    };



    return (
        <View style={{ backgroundColor: '#deebf7', }}>
            <View
                style={{
                    height: 112,
                    // alignItems: 'flex-start',
                    justifyContent: 'center',
                    // paddingLeft: 20

                }}
            >
                <Image
                    source={require("../../assets/app-logo.png")}
                    style={{ height: "100%", width: "100%" }}
                />


            </View>

            <View style={{
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: '#fff',
                paddingTop: 10
            }}>

                <DrawerItem
                    label={"Profile"}
                    onPress={() => { onClickDrawerElement(APP_SCREENS.USERPROFILE, "screen") }}
                    icon={({ focused, size }) => (
                        <AntDesign name='user' size={25} />
                    )}
                />

                <Divider thickness={1} />

                <DrawerItem
                    label={"All inboxes"}
                    onPress={() => {
                        onClickDrawerElement(changeSelectedAccount(grantidlist), "dispatch")
                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='inbox' size={25} />
                    )}
                    style={{ backgroundColor: selectedAccount === ALL_ACCOUNTS ? themeColor.SECONDARY : 'white' }}
                />

                {
                    grantidlist && grantidlist.map((data, index) => {

                        return (
                            <DrawerItem
                                label={data.email}
                                onPress={() => {
                                    onClickDrawerElement(changeSelectedAccount(data), "dispatch")
                                }}
                                icon={({ focused, size }) => (
                                    <MaterialCommunityIcons name={getEmailProviderIcon(data.email)} size={25} />
                                )}
                                key={index}
                                style={{ backgroundColor: selectedAccount === data.email ? themeColor.SECONDARY : 'white' }}
                            />
                        )
                    })
                }

                <DrawerItem
                    label={"Add accounts"}
                    onPress={() => { onClickDrawerElement(APP_SCREENS.ADDACCOUNT, "screen") }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='plus' size={25} />
                    )}
                />
                <Divider thickness={1} />
                <DrawerItem
                    label={INBOX_LABEL.PRIMARY}
                    onPress={() => { onClickDrawerElement(changeInboxLabel({ label: INBOX_LABEL.PRIMARY }), "dispatch") }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='inbox' size={25} />
                    )}
                    style={{ backgroundColor: activeInboxLabel === INBOX_LABEL.PRIMARY ? themeColor.SECONDARY : 'white' }}
                />
                <DrawerItem
                    label={INBOX_LABEL.SENT}
                    onPress={() => { onClickDrawerElement(changeInboxLabel({ label: INBOX_LABEL.SENT }), "dispatch") }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='send' size={25} />
                    )}
                    style={{ backgroundColor: activeInboxLabel === INBOX_LABEL.SENT ? themeColor.SECONDARY : 'white' }}
                />

                <Divider thickness={1} />

                <DrawerItem
                    label={"Settings"}
                    onPress={() => { }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='cog' size={25} />
                    )}
                />


                <DrawerItem
                    label={"Log out"}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        dispatch(logout());

                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='logout' size={25} />
                    )}
                />

                <DrawerItem
                    label={"Change host"}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        dispatch(deleteHost());

                    }}
                    icon={({ focused, size }) => (
                        <MaterialCommunityIcons name='logout' size={25} />
                    )}
                />

            </View>

        </View>

    );
}

export default CustomDrawer