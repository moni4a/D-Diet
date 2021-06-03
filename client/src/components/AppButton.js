import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from "../config/Colors";

function AppButton({ title, onPress, color, small, ...props }) {
    return (
        <TouchableOpacity style={small ? styles.buttonSmall : styles.button} onPress={onPress} {...props}>
            <View style={[small ? styles.buttonSmall : styles.button, { backgroundColor: colors[color] }]}>
                <Text style={small ? styles.buttonSmallText : styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        marginVertical: 10,
    },
    buttonSmall: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    buttonSmallText: {
        color: colors.white,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
});

export default AppButton;