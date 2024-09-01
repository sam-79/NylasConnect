import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, ActivityIndicator, Alert, } from 'react-native';
import { View, TextField, Button, Text, Card, ListItem } from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { syncEvents } from '../api/calender_api';
import { useSelector } from 'react-redux';

const ChatCalender = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);

    const handleEventSync = async () => {
        setIsLoading(true);
        Alert.alert("synchronization in progress")
        syncEvents({
            hostname: hostname,
            access_token: userData.access_token,
        }).then((response) => {
            setIsLoading(false);
            if (response.status !== "success") {
                Alert.alert("fail to sync events", response.status)
            }

        }).catch((error) => {
            setIsLoading(false);
            Alert.alert("fail to sync events", error.status)
        })
    }

    useEffect(() => {
        handleEventSync()
    }, [])

    const handleSend = async () => {
        if (inputText.trim()) {
            const userMessage = {
                id: messages.length + 1,
                text: inputText,
                isUser: true,
            };

            // Add user message to the state
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputText('');

            // Call the API with the user's message
            const apiResponse = await sendToApi(inputText);

            // Add API response to the state
            const botMessage = {
                id: messages.length + 2,
                text: apiResponse,
                isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    const sendToApi = async (message) => {
        setIsLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${userData.access_token}`)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                "user_prompt": message
            })
        };
        try {
            const response = await fetch(`${hostname}/api/calendar_chatbot`, requestOptions);
            const jsonData = await response.json();
            console.log(jsonData)
            setIsLoading(false)
            return jsonData.data;
        } catch (error) {
            console.error(error);
            setIsLoading(false)

            return 'Sorry, something went wrong.';

        }
    }

    return (
        <View style={styles.container}>
            <View row spread marginV-10>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <MaterialCommunityIcons name='chevron-left' size={30} />
                </Pressable>
            </View>
            <View style={styles.chatContainer}>
                {messages.map((message) => (
                    <ListItem key={message.id} style={message.isUser ? styles.userMessage : styles.botMessage}>
                        <View borderRadius={10} padding={10} backgroundColor={message.isUser ? '#007AFF' : '#f0f0f0'}>
                            <Text style={message.isUser ? styles.userText : styles.botText}>{message.text}</Text>
                        </View>
                    </ListItem>
                ))}
            </View>

            {
                isLoading ? <ActivityIndicator style={{margin:50}} animating={isLoading} />
                    :
                    <View style={styles.inputContainer}>
                        <TextField
                            placeholder="Type a message..."
                            value={inputText}
                            onChangeText={setInputText}
                            containerStyle={styles.input}
                        />
                        <Button label="Send" onPress={handleSend} style={styles.sendButton} />
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    chatContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
    },
    userMessage: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    botMessage: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    userText: {
        color: '#ffffff',
    },
    botText: {
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#e1e1e1',
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ChatCalender;
