import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeStyles as styles } from './styles';
import { generateRandomColor } from '../utilityFunctions';
import { deleteEvent } from '../api/calender_api';
import { useSelector } from 'react-redux';

function formatDatetimeRange(start, end) {
    // Helper function to format datetime strings
    function formatDatetime(datetimeStr) {
        const date = new Date(datetimeStr);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
        const dateStr = `${day}-${month}-${year}`; // dd-mm-yyyy

        // Extract time without seconds
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`; // HH:mm

        return { dateStr, timeStr };
    }

    const startFormatted = formatDatetime(start);
    const endFormatted = formatDatetime(end);

    const { dateStr: startDate, timeStr: startTime } = startFormatted;
    const { dateStr: endDate, timeStr: endTime } = endFormatted;

    // Determine the format based on whether start and end dates are the same
    if (startDate === endDate) {
        return `${startDate} • ${startTime} - ${endTime}`;
    } else {
        return `${startDate} • ${startTime} - ${endDate} • ${endTime}`;
    }
}


const EventViewer = ({ navigation, route }) => {
    const [event, setEvent] = useState(route.params.event);
    const [isLoading, setIsLoading] = useState(false)

    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);


    

    const handleDelete = () => {
        deleteEvent({
            hostname: hostname,
            access_token: userData.access_token,
            data: {
                "grant_id": event.grant_id,
                "id": event.id,
                "calendar_id": event.calendar_id
            }
        }).then((response) => {
            setIsLoading(false);
            if (response.status === "success") {
                Alert.alert("Event Deleted","Please referesh to get updated events")
                navigation.goBack()
            } else {
                Alert.alert("fail", response.status)
            }

        })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert("error")
            })
    }


    return (
        <View style={{ padding: 20 }}>
            <View row spread>

                <Pressable onPress={() => navigation.goBack({source:"events"})}>
                    <MaterialCommunityIcons name='close' size={30} />
                </Pressable>
                <Pressable onPress={handleDelete}>
                    <MaterialCommunityIcons name='delete' size={30} />
                </Pressable>
            </View>

            {
                isLoading && <ActivityIndicator animating={isLoading} />
            }

            <View marginV-20 marginT-50 row >
                <View >

                    <Text marginR-10 style={{ fontSize: 20 }}>
                        🟦
                    </Text>
                </View>
                <View>

                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                        {/* <MaterialCommunityIcons name='square' color={'blue'} size={20} /> */}
                        {event.title}
                    </Text>
                    <Text>{formatDatetimeRange(event.start_time, event.end_time)}</Text>

                </View>
            </View>



            <Pressable style={{ flexDirection: 'row', marginVertical: 20 }} onPress={() => Linking.openURL(event.conferencing_url)}>
                <View marginR-10>
                    <MaterialIcons name='call' size={25} />
                </View>

                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Join call</Text>
                    <Text>{event.conferencing_url}</Text>
                </View>
            </Pressable>

            <View marginV-20 row>
                <View marginR-10>
                    <MaterialCommunityIcons name='square' size={25} />
                </View>
                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Organizer</Text>
                    <Text>{event.organizer_email}</Text>
                </View>
            </View>

            <View marginV-20 row>
                <View marginR-10>
                    <MaterialIcons name='people-alt' size={25} />
                </View>
                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{event.participants.length} Guest</Text>
                    {
                        event.participants.map((item, index) => {
                            let randomColor = generateRandomColor()
                            return (
                                <View centerV row margin-10 key={index}>
                                    <View margin-5 style={[styles.avatar, { backgroundColor: randomColor }]}>
                                        <Text style={styles.initials}>{item.email[0].toUpperCase()}</Text>
                                    </View>
                                    <View centerV>
                                        <Text>{item.email}</Text>
                                        <Text>{item.status}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

            {/* <View marginV-10>
                <Text>Event for </Text>
                <Text>{event.organizer_email}</Text>
            </View> */}

            {event.description && <View marginV-20 row>
                <View marginR-10>
                    <MaterialCommunityIcons name='information-variant' size={25} />
                </View>
                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Info</Text>
                    <Text>{event.description}</Text>
                </View>
            </View>}

            {event.location && <View marginV-20 row>
                <View marginR-10>
                    <MaterialIcons name='location-on' size={25} />
                </View>
                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Place</Text>
                    <Text>{event.location}</Text>
                </View>
            </View>}


        </View >
    );
};


export default EventViewer;
