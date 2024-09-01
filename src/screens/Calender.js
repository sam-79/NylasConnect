import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TextInput, Alert, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { View, Modal, Text, Card, Colors, Button, Incubator } from 'react-native-ui-lib';
import { getCurrentDate } from '../utilityFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getCalenderEvents } from '../api/calender_api';
import { APP_SCREENS, themeColor, CUSTOM_MARGIN } from '../constants';
import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';
const { width } = Dimensions.get('window');


// Example data
const initialItems = [
    {
        "id": "68q3ap9g69hjgb9i64s3ib9k65gmcbb168s68b9o6so34o9l71hj8dr26s",
        "object": "event",
        "status": "confirmed",
        "calendar_id": "ghostpy001@gmail.com",
        "grant_id": "92e7a52d-1798-4968-9914-2076dec315e8",
        "title": "Football forever ♾️",
        "creator_name": "",
        "creator_email": "ghostpy001@gmail.com",
        "organizer_name": "",
        "organizer_email": "ghostpy001@gmail.com",
        "attendees": [],
        "participants": [
            {
                "email": "sameerborkar79@gmail.com",
                "status": "noreply"
            },
            {
                "email": "ghostpy001@gmail.com",
                "status": "yes"
            }
        ],
        "conferencing_provider": "Google Meet",
        "conferencing_meeting_code": "gtt-drpo-idj",
        "conferencing_url": "https://meet.google.com/gtt-drpo-idj",
        "start_time": "2024-08-25T18:30:00+05:30",
        "end_time": "2024-08-25T19:30:00+05:30",
        "start_timezone": "Asia/Kolkata",
        "end_timezone": "Asia/Kolkata",
        "reminders": {
            "use_default": true,
            "overrides": []
        },
        "html_link": "https://www.google.com/calendar/event?eid=NjhxM2FwOWc2OWhqZ2I5aTY0czNpYjlrNjVnbWNiYjE2OHM2OGI5bzZzbzM0bzlsNzFoajhkcjI2cyBnaG9zdHB5MDAxQG0",
        "visibility": "default",
        "created_at": "2024-08-25T12:13:07+00:00",
        "updated_at": "2024-08-25T12:13:07+00:00",
        "user_id": 3
    }
]

const Calender1 = ({ navigation, route, source }) => {
    const [items, setItems] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', time: '' });
    const [selectedDate, setSelectedDate] = useState('');

    const dispatch = useDispatch()

    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);
    const { grantidlist } = useSelector(state => state.grants)
    const { allCalenderEvents, isLoading } = useSelector(state => state.calender)

    useEffect(() => {
        console.log("api called")
        dispatch(getCalenderEvents({ access_token: userData.access_token, hostname: hostname }))
    }, [])
    // console.log("allCalenderEvents:", allCalenderEvents)
    // console.log("items:", items)

    useEffect(() => {
        loadItems()
    }, [allCalenderEvents])


    const loadItems = (day) => {

        if (allCalenderEvents) {
            const newItems = {};

            for (let i in allCalenderEvents) {
                console.log("participants", allCalenderEvents[i].participants)
                const eventStartDate = timeToString(allCalenderEvents[i].start_time)
                console.log("eventStartDate:", eventStartDate)
                if (!newItems[eventStartDate]) {
                    newItems[eventStartDate] = [allCalenderEvents[i]]
                } else {
                    newItems[eventStartDate].push(allCalenderEvents[i])
                }

            }

            setItems(newItems);

        }



    };

    const timeToString = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const renderItem = (item) => {
        return (
            <Pressable onPress={() => navigation.navigate(APP_SCREENS.EVENTVIEWER, { event: item })}>
                <View style={{ padding: 20, backgroundColor: 'white', marginBottom: 10 }}>
                    <Text>{item.title}</Text>
                    <Text>{item.calendar_id}</Text>
                    <Text>
                        View Details
                    </Text>
                </View>
            </Pressable>
        );
    };

    const handleAddEvent = () => {
        if (newEvent.name && newEvent.time && selectedDate) {
            const updatedItems = { ...items };
            if (!updatedItems[selectedDate]) {
                updatedItems[selectedDate] = [];
            }
            updatedItems[selectedDate].push(newEvent);
            setItems(updatedItems);
            setNewEvent({ name: '', time: '' });
            setModalVisible(false);
            Alert.alert('Success', 'Event added!');
        } else {
            Alert.alert('Error', 'Please fill out all fields.');
        }
    };

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
    return (
        <SafeAreaView style={styles.container}>
            <Button
                label="Add Event"
                backgroundColor={Colors.primary}
                onPress={() => setModalVisible(true)}
                style={styles.button}
            />
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={getCurrentDate()}
                renderItem={renderItem}
                renderEmptyDate={() => <Text>No events for this day.</Text>}
                rowHasChanged={(r1, r2) => r1.name !== r2.name}
                pastScrollRange={1}
                futureScrollRange={1}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                renderEmptyData={() => {
                    return <View />;
                }}
                onRefresh={() => dispatch(getCalenderEvents({ access_token: userData.access_token, hostname: hostname }))}
                // Set this true while waiting for new data from a refresh
                refreshing={isLoading}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
            // refreshControl={null}
            />


            <FloatingButton onPress={() => navigation.navigate(APP_SCREENS.CHATCALENDER, { source: APP_SCREENS.CALENDER })}
                iconName={"pencil-outline"}
                label={"AI ✨"}
                bgColor={"#0d77ab"}
                labelColor={"white"}
            />


            {/* MODAL for agenda creation */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text text60>Add New Event</Text>
                        <TextInput
                            placeholder="Event Name"
                            value={newEvent.name}
                            onChangeText={(text) => setNewEvent({ ...newEvent, name: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Event Time (e.g., 12:00 PM)"
                            value={newEvent.time}
                            onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
                            style={styles.input}
                        />
                        <Button
                            label="Add Event"
                            onPress={handleAddEvent}
                            backgroundColor={Colors.primary}
                            style={styles.button}
                        />
                        <Button
                            label="Cancel"
                            onPress={() => setModalVisible(false)}
                            backgroundColor={Colors.gray30}
                            style={styles.button}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: CUSTOM_MARGIN/2,
    },
    button: {
        marginBottom: 10,
    },
    card: {
        // width: width * 0.9,
        // alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        width: width * 0.8,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray60,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default Calender1;
