import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

function Screen({ children, style }) {
    return <SafeAreaView style={[styles.screen, style]}>
        <DismissKeyboard>
            <View style={[styles.view, style]}>{children}</View>
        </DismissKeyboard>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        marginHorizontal: -5,
        flex: 1,
    },
    view: {
        flex: 1,
    },
});

export default Screen;