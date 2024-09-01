import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { View, Modal, Text, Card, Colors, Button, Incubator } from 'react-native-ui-lib';

const { width } = Dimensions.get('window');

// Example data
const initialItems = {
    '2024-08-15': [{ name: 'Event 1', time: '10:00 AM' }, { name: 'Event 2', time: '02:00 PM' }],
    '2024-08-16': [{ name: 'Event 3', time: '11:00 AM' }, { name: 'Event 4', time: '11:00 AM' }],

    '2024-08-17': [{ name: 'Event 5', time: '11:00 AM' },{ name: 'Event 6', time: '09:00 AM' },{ name: 'Event 7', time: '05:00 PM' },{ name: 'Event 8', time: '12:00 AM' }]

};

const Calender = () => {
    const [items, setItems] = useState(initialItems);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', time: '' });
    const [selectedDate, setSelectedDate] = useState('');

    const loadItems = (day) => {
        setTimeout(() => {
            const newItems = { ...items };
            if (!newItems[day.dateString]) {
                newItems[day.dateString] = [];
            }
            setItems(newItems);
        }, 1000);
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

    const renderItem = (item) => (
        <View
            margin-10
            padding-10
            borderRadius={10}
            style={{backgroundColor:'white', borderWidth:1,borderColor:'black',}}
        >
            <Text text40>{item.name}</Text>
            <Text text70 gray>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button
                label="Add Event"
                backgroundColor={Colors.primary}
                onPress={() => setModalVisible(true)}
                style={styles.button}
            />
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2024-08-15'}
                renderItem={renderItem}
                renderEmptyDate={() => <Text>No events for this day.</Text>}
                rowHasChanged={(r1, r2) => r1.name !== r2.name}
                pastScrollRange={1}
                futureScrollRange={1}
                onDayPress={(day) => setSelectedDate(day.dateString)}

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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

export default Calender;
