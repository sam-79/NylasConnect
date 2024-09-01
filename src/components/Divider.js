import React from 'react';
import { View } from 'react-native-ui-lib'; // Using View from RNUILIB

const Divider = ({ color = '#E0E0E0', thickness = 1, marginVertical = 10, marginHorizontal = 0 }) => {
    return (
        <View
            style={{
                height: thickness,
                backgroundColor: color,
                marginVertical: marginVertical,
                marginHorizontal: marginHorizontal
            }}
        />
    );
};

export default Divider;
