import { StatusBar, SafeAreaView, FlatList, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { HomeStyles as styles } from './styles';
import { View, Text, Drawer, Colors, Button as UIButton, Button } from 'react-native-ui-lib';
import { ALL_ACCOUNTS, APP_SCREENS, COMPOSEMAIL, CUSTOM_MARGIN, INBOX_LABEL, themeColor } from '../constants';
import { generateRandomColor } from '../utilityFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { listEmails, listGrants } from '../api/inbox';
import { changeSelectedAccount } from '../../redux/features/globalReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingButton from '../components/FloatingButton';




const Inbox = ({ navigation }) => {

    const dispatch = useDispatch();
    const { allEmailList, activeInboxLabel, isLoading } = useSelector(state => state.inbox)
    const { selectedAccount, accountData } = useSelector(state => state.global)
    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);
    const { grantidlist } = useSelector(state => state.grants)

    // console.log(allEmailList)
    // navigation.getParent().setOptions({ tabBarStyle: { display: 'flex' } });


    const EmailItem = ({ email }) => {
        const randomColor = generateRandomColor();
        return (
            <Drawer
                rightItems={[{ text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed') }]}
                leftItem={{ text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed') }}
            >
                <UIButton borderRadius={0} row left centerV bg-white onPress={() => navigation.navigate(APP_SCREENS.EMAILVIEWER, { grant_id: email.grant_id, id: email.id, starred: email.starred, subject: email.subject, thread_id: email.thread_id })}>
                    {
                        email.avatar ?
                            <View >
                                <Image source={{ uri: email.avatar }} style={[styles.avatar]} />
                            </View>
                            :
                            <View style={[styles.avatar, { backgroundColor: randomColor }]}>
                                <Text style={styles.initials}>{email.from[0].name ? email.from[0].name[0].toUpperCase() : email.from[0].email[0].toUpperCase()}</Text>
                            </View>
                    }
                    <View paddingL-10 flex>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail" style={[styles.sender, { fontWeight: email.unread ? 'bold' : 'normal' }]}>{email.from[0].email}</Text>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail" style={[styles.subject, { fontWeight: email.unread ? 'bold' : 'normal' }]}>{email.subject}</Text>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail" style={[styles.snippet]}>{email.snippet}</Text>
                    </View>
                    <Text style={styles.time}>{email.date}</Text>
                </UIButton >
            </Drawer>

        )
    };


    //function to get list of Emails
    // const GetAllEmailList
    const GetEmailList = () => {
        grant_ids = []
        if (selectedAccount == ALL_ACCOUNTS) {
            for (let i in grantidlist) {
                grant_ids.push(grantidlist[i].id)
            }
        } else {
            grant_ids.push(selectedAccount.id)
        }
        dispatch(listEmails({
            hostname, access_token: userData.access_token,
            grant_ids
        }))

    }

    useEffect(() => {
        // // Function to be called only once when the component mounts
        if (grantidlist == null) {
            dispatch(listGrants({ hostname, access_token: userData.access_token }));
        } else {
            dispatch(changeSelectedAccount(grantidlist))
        }
        GetEmailList()

        // // The empty dependency array ensures this runs only on mount
    }, [grantidlist]);

    const emailFilter = (email) => {
        if (selectedAccount === ALL_ACCOUNTS) {
            // return email.label === inboxLabel;
            let tempEmailList = grantidlist.map(item => item.email);
            return !tempEmailList.includes(email.from[0].email.toLowerCase());
        } else {
            return email.to[0].email.toLowerCase() === selectedAccount.toLowerCase() && email.from[0].email.toLowerCase() !== selectedAccount.toLowerCase();
        }
    }



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
console.log("grantidlist",grantidlist)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themeColor.PRIMARY} />
            <Header navigation={navigation} />
            <View flex>
                <Text>{selectedAccount}: {activeInboxLabel}</Text>

                {
                    allEmailList ?
                        <FlatList
                            data={allEmailList}
                            renderItem={({ item }) => emailFilter(item) ? <EmailItem email={item} /> : null}
                            keyExtractor={item => item.id}
                            onRefresh={() => {
                                GetEmailList()
                            }}
                            refreshing={isLoading}
                        // ListHeaderComponent={<Header navigation={navigation} />}
                        />
                        :
                        <></>

                }

                <FloatingButton onPress={() => navigation.navigate(APP_SCREENS.EMAILCOMPOSE, { source: COMPOSEMAIL.COMPOSE })}
                    iconName={"pencil-outline"}
                    label={"Compose"}
                    bgColor={"#0d77ab"}
                    labelColor={"white"}
                />
            </View>
        </SafeAreaView>
    )
}


// const styles = StyleSheet.create({
//     list: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     emailItem: {
//         flexDirection: 'row',
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f0f0f0',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 100,
//         marginRight: 15,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     initials: {
//         fontSize: 20
//     },
//     emailContent: {
//         flex: 1,
//     },
//     sender: {
//         // fontWeight: 'bold',
//         fontSize: 16,
//     },
//     subject: {
//         fontSize: 14,
//         color: '#333',
//         marginTop: 3,
//     },
//     snippet: {
//         fontSize: 12,
//         color: '#777',
//         marginTop: 3,
//     },
//     time: {
//         fontSize: 12,
//         color: '#999',
//     },
// });

export default Inbox