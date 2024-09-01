// FloatingButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingButton = ({ onPress, label, iconName, bgColor, labelColor }) => {
    return (
        // <View style={styles.container}>
        <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
            {/* <MaterialCommunityIcons name={iconName} size={20} color={"white"} /> */}
            <Text style={[styles.text,{color:labelColor}]}> {label}</Text>
        </TouchableOpacity>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 10, // For Android shadow
    },
    button: {
        zIndex: 10, // For iOS and Android
        position: 'absolute',
        bottom: 30,
        right: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#0d77ab', // Floating button color
        padding: 16,
        borderRadius: 50,
        elevation: 5, // Android shadow
    },
    text: {
        // color: 'white',
        fontSize: 16,
    },
});

export default FloatingButton;
