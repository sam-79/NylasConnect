import React, { useState, useRef, useEffect } from 'react';
import {
    Tes,
    ScrollView,
    KeyboardAvoidingView,
    Platform, StyleSheet,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Text, ExpandableSection, TouchableOpacity, TextField } from 'react-native-ui-lib'
import Divider from '../components/Divider';
import { ALL_ACCOUNTS, COMPOSEMAIL, CUSTOM_MARGIN, themeColor } from '../constants';

import { useSelector } from 'react-redux';
import FloatingButton from '../components/FloatingButton';
import AITextCompose from '../components/AITextCompose';
import { replyEmail, sendEmail } from '../api/inbox';
import { validateEmail } from '../utilityFunctions';

export default EmailCompose = ({ navigation, route }) => {
    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [emailCc, setEmailCc] = useState('');
    const [emailBcc, setEmailBcc] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // List to hold valid recipient emails
    // let validRecipientEmails = [];
    // console.log("validRecipientEmails", validRecipientEmails)
    const scrollViewRef = useRef(null);

    const [expanded, setExpanded] = useState(false)
    // const [emailFromList, setEmailFromList] = useState(null);
    const activeEmail = useSelector(state => state.global.selectedAccount)
    const { grantidlist } = useSelector(state => state.grants)
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);

    const [aiModalVisible, setAIModalVisible] = useState(false)
    // Hide tab navigation
    // navigationTab.getParent().setOptions({ tabBarStyle: { display: 'none' } });

    //function called when user click send email
    const handleSend = () => {
        // Implement your email sending logic here
        console.log('Sending email:', { emailFrom, emailTo, emailCc, emailBcc, emailSubject, emailBody });
        if (emailTo === undefined || emailTo === null || emailTo.trim() === '') {
            Alert.alert("Add recipient")
            return null
        }
        if (emailSubject === undefined || emailSubject === null || emailSubject.trim() === '') {
            Alert.alert("Add subject")
            return null
        }
        if (emailBody === undefined || emailBody === null || emailBody.trim() === '') {
            Alert.alert("Email body is empty")
            return null
        }


        if (route.params.source == COMPOSEMAIL.COMPOSE) {

            sendEmail({
                hostname: value,
                access_token: userData.access_token,
                email: {
                    grant_id: emailFrom.id,
                    subject: emailSubject,
                    to: processEmails(),
                    body: emailBody
                }
            }).then((response) => {
                setIsLoading(false);
                if (response.status === "success") {
                    setGeneratedResp(response.data.body)
                    navigation.goBack()
                } else {
                    Alert.alert("fail", response.status)
                }

            })
                .catch((error) => {
                    setIsLoading(false);
                    Alert.alert("error")
                })
        } else if (route.params.source == COMPOSEMAIL.REPLY) {
            replyEmail({
                hostname: value,
                access_token: userData.access_token,
                email: {
                    id: route.params.email.id,
                    grant_id: emailFrom.id,
                    subject: emailSubject,
                    to: processEmails(),
                    body: emailBody
                }
            }).then((response) => {
                setIsLoading(false);
                if (response.status === "success") {
                    setGeneratedResp(response.data.body)
                    navigation.goBack()
                } else {
                    Alert.alert("fail", response.status)
                }

            }).catch((error) => {
                setIsLoading(false);
                Alert.alert("error")
            })
        }



    };

    const processEmails = () => {
        let validRecipientEmails = [];
        // Split the string into an array of emails, trimming whitespace
        const emailArray = emailTo.split(',').map(email => email.trim());
        // Iterate over each email and validate it
        for (let email of emailArray) {
            if (validateEmail(email)) {
                let temp = { "email": email }
                validRecipientEmails.push(temp);
            } else {
                alert(`Invalid email address: ${email}`);
            }
        }
        return validRecipientEmails;
    }


    const handleBackPress = () => navigation.goBack();
    const handleDeletePress = () => alert('Delete pressed');
    const handleSaveDraftPress = () => alert('Save as Draft pressed');

    useEffect(() => {
        return navigation.addListener("focus", () => {
            // setEmailFromList(grantidlist)
            console.log(route.params.source, grantidlist)
            if (route.params.source == COMPOSEMAIL.COMPOSE) {
                if (activeEmail != ALL_ACCOUNTS) {
                    setEmailFrom(activeEmail)
                }
            } else if (route.params.source == COMPOSEMAIL.REPLY) {
                let email = route.params.email;
                for (let i in grantidlist) {
                    if (grantidlist[i].email == email.to[0].email) {
                        setEmailFrom(grantidlist[i])
                        break
                    }
                }
                setEmailTo(email.from[0].email)
                setEmailSubject(`Re: ${email.subject}`)
            }
        })
    }, [navigation])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
                    <MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.rightButtonsContainer}>
                    <TouchableOpacity onPress={handleDeletePress} style={styles.button}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSaveDraftPress} style={styles.button}>
                        <Text style={styles.buttonText}>Save as Draft</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: CUSTOM_MARGIN / 2 }}>

                {
                    route.params.source == COMPOSEMAIL.COMPOSE ?

                        <ExpandableSection
                            expanded={expanded}
                            sectionHeader={
                                <View row centerV spread>
                                    <Text>From</Text>
                                    <Text style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}>{emailFrom.email}</Text>
                                    {expanded ?
                                        <MaterialCommunityIcons name='chevron-down' size={25} />
                                        : <MaterialCommunityIcons name='chevron-up' size={25} />
                                    }
                                </View>

                            }
                            onPress={() => setExpanded(!expanded)}
                        >
                            {
                                grantidlist && grantidlist.map((data, index) => {
                                    return (
                                        <TouchableOpacity key={index} flex onPress={() => {
                                            setEmailFrom(data)
                                            setExpanded(false)
                                        }}>
                                            <Text flex >{data.email}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ExpandableSection>
                        : <View row centerV spread>
                            <Text>From</Text>
                            <Text style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}>{emailFrom.email}</Text>
                        </View>
                }
                <Divider />

                <View row centerV >
                    <Text>To</Text>
                    <TextInput
                        style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}
                        // placeholder="To"
                        value={emailTo}
                        onChangeText={setEmailTo}
                        autoComplete={"email"}
                        // inputMode={"email"}
                        keyboardType={"email-address"}
                        onBlur={processEmails}

                    />
                </View>
                <Divider />
                <View row centerV >
                    <Text>CC</Text>
                    <TextInput
                        style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}
                        value={emailCc}
                        onChangeText={setEmailCc}
                        autoComplete={"email"}
                        inputMode={"email"}
                        keyboardType={"email-address"}
                    />
                </View>
                <Divider />
                <View row centerV >
                    <Text>BCC</Text>
                    <TextInput
                        style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}
                        value={emailBcc}
                        onChangeText={setEmailBcc}
                        autoComplete={"email"}
                        inputMode={"email"}
                        keyboardType={"email-address"}
                    />
                </View>
                <Divider />
                <View row centerV >
                    <Text>Subject</Text>
                    <TextInput
                        style={{ flex: 1, marginLeft: CUSTOM_MARGIN }}
                        value={emailSubject}
                        onChangeText={setEmailSubject}
                    />
                </View>
                <Divider />
                <View centerV >
                    <TextInput
                        placeholder='Compose Body'
                        style={{ flex: 1 }}
                        multiline
                        value={emailBody}
                        onChangeText={setEmailBody}
                    />
                </View>
            </ScrollView>

            <FloatingButton onPress={() => setAIModalVisible(true)}
                // iconName={"pencil-outline"}
                label={"AI✨"}
                bgColor={themeColor.SECONDARY}
                labelColor={"black"}
            />
            <AITextCompose aiModalVisible={aiModalVisible}
                setAIModalVisible={setAIModalVisible}
                modalTitle={route.params.source}
                setAIResponse={setEmailBody}
                setAISubject={setEmailSubject}
                emailData={route.params.source == COMPOSEMAIL.REPLY ? {
                    grant_id: route.params.email.grant_id,
                    thread_id: route.params.email.thread_id
                } : {}} />

            {isLoading ? <ActivityIndicator animating={isLoading} /> :
                <TouchableOpacity
                    style={{
                        backgroundColor: themeColor.PRIMARY,
                        padding: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={handleSend}
                >
                    <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
            }
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    iconButton: {
        padding: 10,
    },
    rightButtonsContainer: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#007bff',
    },
});