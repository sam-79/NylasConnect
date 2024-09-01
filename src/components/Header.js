import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStyles } from '../screens/styles';

const Header = ({ navigation, isDrawer = true }) => {
    return (
        <View style={HomeStyles.headerContainer}>
            {isDrawer && <Pressable style={HomeStyles.menuButton} onPress={() => navigation.toggleDrawer()}>
                <MaterialCommunityIcons name="menu" size={28} color="#fff" />
            </Pressable>}

            <Text style={[HomeStyles.title, { color: "#fff" }]}>NylasConnect</Text>
        </View>
    )
}

export default Header