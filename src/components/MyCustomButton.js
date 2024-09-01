import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

const MyCustomButton = ({ title, onPress, isLoading, BtnStyle, TextStyle }) => {
  return isLoading ?
    <ActivityIndicator size="small" animating={isLoading} color={'black'} />
    :
    < Pressable onPress={onPress} style={BtnStyle} >
      <Text style={TextStyle}>{title}</Text>
    </Pressable >


};

export default MyCustomButton;
