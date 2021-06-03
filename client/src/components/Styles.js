import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontSize: Platform.OS === "android" ? 18 : 20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    },
});

export default styles