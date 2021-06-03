import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default CheckBox = ({ checked, onPress, color, label }) => {
    const styles = makeStyles(color);

    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <View style={styles.checkboxContainer}>
                {
                    checked
                        ? <View style={styles.checkMark}></View>
                        : null
                }
            </View>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

const makeStyles = (color = 'gray') => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        height: 30,
        width: 30,
        marginRight: 10,
        borderWidth: 1,
        borderColor: color,
        borderRadius: '2px',
        background: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkMark: {
        height: 15,
        width: 8,
        transform: [{ rotate: '45deg' }],
        borderBottomWidth: 1,
        borderBottomColor: color,
        borderRightWidth: 1,
        borderRightColor: color,
    }
});
