// AITextCompose.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { emailGenerator, replyGenerator } from '../api/emailGeneration';
import { useSelector } from 'react-redux';
import { COMPOSEMAIL } from '../constants';


const AITextCompose = ({ aiModalVisible, setAIModalVisible, modalTitle, setAIResponse, setAISubject, emailData = null }) => {
    const [userPrompt, setUserPrompt] = useState('');
    const [generatedResp, setGeneratedResp] = useState('')
    const [generateSubj, setGeneratedSubj] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);




    // Reset text state when modal is closed
    useEffect(() => {
        if (!aiModalVisible) {
            setUserPrompt('');
            setGeneratedResp('');
        }
    }, [aiModalVisible]);

    if (!aiModalVisible) {
        return null; // Don't render anything if modal is not visible
    }

    const handleGenerate = () => {
        // Handle the generate action
        //sending req to server to generate email
        // let response = "This is sample response"
        // setGeneratedResp(response)

        //api req based on its source either reply or compose new


        if (userPrompt === undefined || userPrompt === null || userPrompt.trim() === '') {
            Alert.alert("No input provided", "Please provide some input for your email")
            return;
        }

        //calling add product function
        setIsLoading(true);

        if (modalTitle == COMPOSEMAIL.REPLY && emailData) {
            console.log("replygenerator", userPrompt)
            replyGenerator({
                hostname: value,
                access_token: userData.access_token,
                user_prompt: userPrompt,
                grant_id: emailData.grant_id,
                thread_id: emailData.thread_id
            }).then((response) => {
                setIsLoading(false);
                if (response.status === "success") {
                    setGeneratedResp(response.data.body)
                    setGeneratedSubj(response.data.subject)
                } else {
                    Alert.alert("fail", response.status)
                }

            }).catch((error) => {
                setIsLoading(false);
                Alert.alert("error")
            })
        } else if (modalTitle == COMPOSEMAIL.COMPOSE) {
            console.log("compose generator")
            emailGenerator({
                hostname: value,
                access_token: userData.access_token,
                email_content: userPrompt
            }).then((response) => {
                setIsLoading(false);
                if (response.status === "success") {
                    setGeneratedResp(response.data.body)
                    setGeneratedSubj(response.data.subject)
                } else {
                    Alert.alert("fail", response.status)
                }

            })
                .catch((error) => {
                    setIsLoading(false);
                    Alert.alert("error")
                })
        }

    };

    const handleCancel = () => {
        // Handle the cancel action
        setUserPrompt(''); // Clear the text input
        setAIModalVisible(false);
    };

    return (
        <Modal
            visible={aiModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{modalTitle} with AI</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type your text here..."
                        value={userPrompt}
                        onChangeText={setUserPrompt}
                        multiline
                    />

                    {
                        generatedResp && <View style={[styles.buttonContainer, { flexDirection: "column" }]}>
                            <Text style={styles.textInput} >
                                {generatedResp}
                            </Text>

                            <Button title='Set Email' onPress={() => {
                                setAIResponse(generatedResp)
                                setAISubject(generateSubj)
                                setAIModalVisible(false)
                            }} />
                        </View>
                    }

                    {
                        isLoading ? <ActivityIndicator animating={isLoading} /> :
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleGenerate}>
                                    <Text style={styles.buttonText}>{generatedResp ? "Regenerate" : "Generate"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        // height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        margin: 5,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AITextCompose;
