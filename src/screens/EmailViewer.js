import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Linking, StyleSheet, Dimensions, SafeAreaView, Alert, ActivityIndicator, Pressable, Modal } from 'react-native';

import { View, Text, } from 'react-native-ui-lib';
import { useHeaderHeight } from '@react-navigation/elements';
import { CUSTOM_MARGIN } from '../constants';
import EmailComponent from '../components/EmailComponent';
import { HomeStyles } from './styles';
import Divider from '../components/Divider';
import { deleteEmail, readEmail, summarizeEmail } from '../api/inbox';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingButton from '../components/FloatingButton';


export default EmailViewer = ({ navigation, route }) => {
    const headerHeight = useHeaderHeight();
    // navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });
    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);
    const [currentOpenedMail, setCurrentOpenedMail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [summary, setSummary] = useState("")

    useEffect(() => {
        setIsLoading(true)
        readEmail(
            {
                hostname: hostname,
                access_token: userData.access_token,
                grant_id: route.params.grant_id,
                id: route.params.id
            }
        ).then((response) => {
            setIsLoading(false)
            setCurrentOpenedMail([response.data])
        }).catch((error) => {
            setIsLoading(false)
            Alert.alert("Error", "Failed to load email")
        })
    }, [])

    const handleDelete = () => {

        deleteEmail({
            hostname: hostname,
            access_token: userData.access_token,
            grant_id: route.params.grant_id,
            id: route.params.id
        }).then((response) => {
            setIsLoading(false)
            navigation.goBack()
        }).catch((error) => {
            setIsLoading(false)
            Alert.alert("Error", "Failed to delete email")
        })
    }


    const handleSummarizeEmail = () => {
        setIsLoading(true)
        summarizeEmail({
            hostname: hostname,
            access_token: userData.access_token,
            data: {
                "grant_id": currentOpenedMail[0].data.grant_id,
                "thread_id": currentOpenedMail[0].data.thread_id,
            }
        }).then((response) => {
            setIsLoading(false)
            setSummary(response.data)
        }).catch((error) => {
            setIsLoading(false)
            Alert.alert("Error", "Failed to get summary")
        })
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View row spread padding-10>
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={25} />
                </Pressable>
                <Pressable onPress={() => {
                    Alert.alert('Confirm delete', 'This action cannot be reverted', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => handleDelete() },
                    ], { cancelable: true });
                }}>
                    <MaterialCommunityIcons name='delete' size={25} />
                </Pressable>
            </View>
            <ScrollView style={[HomeStyles.container, { padding: CUSTOM_MARGIN / 2 }]}>


                {
                    // isLoading ? <ActivityIndicator animating={isLoading} />
                    //     :
                    //     currentOpenedMail ? currentOpenedMail.map((data) => {
                    //         return <View key={data.request_id}>
                    //             <EmailComponent email={data.data} />
                    //             <Divider marginVertical={5} thickness={2} />
                    //             <Divider marginVertical={5} thickness={2} />
                    //         </View>
                    //     }) :
                    //         <View flex center>
                    //             <Text center>Failed to load</Text>
                    //         </View>
                    isLoading ? <ActivityIndicator animating={isLoading} />
                        :
                        currentOpenedMail ? <View key={currentOpenedMail[0].request_id}>
                            <EmailComponent email={currentOpenedMail[0].data} />
                            <Divider marginVertical={5} thickness={2} />
                            <Divider marginVertical={5} thickness={2} />
                        </View>
                            :
                            <View flex center>
                                <Text center>Failed to load</Text>
                            </View>
                }
            </ScrollView>

            {
                currentOpenedMail &&
                <FloatingButton onPress={() => {
                    handleSummarizeEmail()
                    setIsModalVisible(true)
                }}
                    iconName={"pencil-outline"}
                    label={"Summarize ✨"}
                    bgColor={"#0d77ab"}
                    labelColor={"white"}
                />
            }

            {
                isModalVisible &&
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            setIsModalVisible(!isModalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {
                                    summary === null || summary.length < 1 ? <ActivityIndicator animating={isLoading} /> :
                                        < Text style={styles.modalText}>{summary}</Text>
                                }
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setIsModalVisible(!isModalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View >
            }
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


