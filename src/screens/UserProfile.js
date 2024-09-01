import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Pressable, Image, ImageBackground, Alert, ActivityIndicator, TextInput } from "react-native";
import { View, Text, TextField, Button } from "react-native-ui-lib";
import image from "../../assets/userbackground.png";
import { GetUserProfile, syncCalenderData, syncData, syncGrantData, UpdateUserProfile } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { CUSTOM_MARGIN } from "../constants";


const UserProfile = ({ navigation }) => {

    const [userProfileData, setUserProfileData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [updatedValue, setUpdatedValue] = useState(null)
    const [hideKey, setHideKey] = useState(true)


    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);
    const { grantidlist } = useSelector(state => state.grants)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        GetUserProfile({ hostname, access_token: userData.access_token, email: userData.username })
            .then((response) => {
                setIsLoading(false)
                console.log("response:", response)
                setUserProfileData(response.data)
                setUpdatedValue(response.data)
            }).catch((error) => {
                console.log("error:", error)
                setIsLoading(false)
                Alert.alert("Error", "failed to load user details")
            })
    }, [])

    const handleSave = () => {
        setIsLoading(true)
        UpdateUserProfile({
            hostname, access_token: userData.access_token,
            data: {
                "name": updatedValue.name,
                "api_key": updatedValue.Api_key,
                "organisation": updatedValue.organisation
            }
        })
            .then((response) => {
                setIsLoading(false)
                console.log("response:", response)
                setUserProfileData(response.data)
                setUpdatedValue(response.data)
                setIsEditable(false)
            }).catch((error) => {
                console.log("error:", error)
                setIsLoading(false)
                Alert.alert("Error", error.message)
            })
    }

    const handleSync = () => {
        // syncData({
        //     hostname: hostname,
        //     access_token: userData.access_token
        // }).then(() => {
        //     Alert.alert("success", "GrantID Data synced ")
        // }).catch((error) => {
        //     Alert.alert("Failed", )

        // })

        dispatch(syncGrantData({
            hostname: hostname,
            access_token: userData.access_token
        }))

        syncCalenderData({
            hostname: hostname,
            access_token: userData.access_token
        }).catch(() => {
            Alert.alert("Error", "Failed to sync calender data")
        }).then(()=>{
            Alert.alert("Success", "Calender Data synced")

        })
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isLoading ? <ActivityIndicator animating={isLoading} /> :
                    userProfileData ?
                        <View>
                            <ImageBackground source={require('../../assets/userbackground.png')} resizeMode={"cover"} style={styles.header}>
                                <Pressable onPress={() => { navigation.goBack() }} style={{ padding: 20 }}>
                                    <MaterialCommunityIcons name='chevron-left' size={30} color={'black'} />
                                </Pressable>
                                <View>
                                    {/* <Image
                                    style={styles.location}
                                    source={require("../assets/locationSvg.svg")}
                                    /> */}
                                </View>
                                <View>
                                    {/* <Image
                                    style={styles.hamburger}
                                    source={require("../assets/HamburgerIcon.png")}
                                    /> */}
                                </View>
                                <View style={styles.headerContent}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.name}>Welcome</Text>
                                        <TextInput
                                            style={styles.userInfo}
                                            value={isEditable ? updatedValue.name : userProfileData.name}
                                            editable={isEditable}
                                            onChangeText={value => setUpdatedValue({ ...updatedValue, name: value })}

                                        />
                                    </View>
                                    <View>
                                        <Image
                                            style={styles.avatar}
                                            source={require("../../assets/userprofile.png")}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>

                            <View style={styles.body}>
                                <View style={styles.RectangleShapeView}>
                                    <View row centerV>
                                        <Text style={styles.headtText}>API key</Text>
                                        <Pressable onPress={() => { setHideKey(!hideKey) }} style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                                            <MaterialCommunityIcons name={hideKey ? "eye-off" : "eye"} color={"black"} size={20} />
                                        </Pressable>
                                    </View>
                                    <TextInput
                                        style={styles.SubjectText}
                                        value={isEditable ? updatedValue.Api_key : userProfileData.Api_key}
                                        secureTextEntry={hideKey}
                                        editable={isEditable}
                                        onChangeText={value => setUpdatedValue({ ...updatedValue, Api_key: value })}
                                    // multiline={true}

                                    />
                                </View>

                                <View style={styles.RectangleShapeView}>
                                    <Text style={styles.headtText}>Email</Text>
                                    <TextInput
                                        style={styles.SubjectText}
                                        value={userProfileData.email}
                                        editable={false}
                                        onChangeText={value => setUpdatedValue({ ...updatedValue, email: value })}
                                    />
                                </View>

                                <View style={styles.RectangleShapeView}>
                                    <Text style={styles.headtText}>Organisation</Text>
                                    <TextInput
                                        style={styles.SubjectText}
                                        value={isEditable ? updatedValue.organisation : userProfileData.organisation}
                                        editable={isEditable}
                                        onChangeText={value => setUpdatedValue({ ...updatedValue, organisation: value })}
                                    />
                                </View>

                                <View style={styles.RectangleShapeView}>
                                    <Text style={styles.headtText}>Date created</Text>
                                    <TextInput
                                        style={styles.SubjectText}
                                        value={userProfileData.date_created}
                                        editable={false}
                                    />
                                </View>


                                {
                                    isEditable ?
                                        <View>
                                            <Button label={"Cancel"} margin-10 backgroundColor={"red"} onPress={() => setIsEditable(false)} />
                                            <Button label={'Save'} margin-10 onPress={handleSave} />
                                        </View>
                                        :
                                        <Button label={'Modify'} outline margin-10 onPress={() => setIsEditable(true)} />
                                }

                                {
                                    userProfileData.Api_key && <View>
                                        {/* <Button label={"Cancel"} margin-10 backgroundColor={"red"} onPress={() => setIsEditable(false)} /> */}
                                        <Button label={'Sync Data'} margin-10 onPress={() => handleSync()} />
                                    </View>
                                }


                            </View>
                        </View>
                        :
                        <Text center>Failed to load user details </Text>
            }
        </View>
    );

}
export default UserProfile;

const styles = StyleSheet.create({
    header: {
        // backgroundImage: `url(${image})`,
        // backgroundSize: "contain",
        height: 250
    },

    headerContent: {
        padding: 30,
        paddingTop: 0,
        alignItems: "center",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "white",
        // float: "right"
    },
    location: {
        borderColor: "white",
        width: 10,
        height: 10,
        float: "left"
    },
    hamburger: {
        borderColor: "white",
        width: 10,
        height: 10,
        float: "right"
    },
    name: {
        fontSize: 22,
        color: "black",
        fontWeight: "600",
    },
    headtText: {
        color: "grey",
        fontWeight: "600",
    },
    SubjectText: {
        color: "black",
        fontWeight: "500",
        fontSize: 16,
    },
    userInfo: {
        fontSize: 20,
        color: "white",
        fontWeight: "600"
    },
    btn: {
        backgroundColor: "#3B525F",
        borderRadius: 10,
        width: 200,
        height: 50,
        alignItems: "center",
        elevation: 3
    },
    body: {
        backgroundColor: "white",
        height: 500,
        alignItems: "center"
    },
    text: {
        color: "white",
    },
    RectangleShapeView: {
        marginTop: CUSTOM_MARGIN,
        padding: CUSTOM_MARGIN / 2,
        width: "90%",
        // height: 80,
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        elevation: 3
    }
});
