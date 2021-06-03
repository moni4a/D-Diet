import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import colors from "../config/Colors";
import AppButton from "../components/AppButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PatientsRequestScreen() {
    const [submitted, SetSubmitted] = useState(false);
    const onPressHandler = () => {
        SetSubmitted(!submitted);
    }

    return (
        <View style={[styles.userInfoSection, { marginTop: 40 }]}>

            <View style={styles.row}>
                <Icon name="account" color="#619196" size={45} />
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>Monika</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20, paddingLeft: 45 }}>Rakauskaitė</Text>
            </View>
            <View style={styles.row}>
                <Icon name="email" color="#AAD9CD" size={45} />
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>monika@email.com</Text>
            </View>


            <AppButton title="Sutikti peržiūrėti duomenis" />


            <Button title="Ištrinti paciento prašymą"
                color={colors.secondary} fontFamily="Avenir" fontWeight="bold" fontSize={30}
                onPress={() => { Alert.alert("Modal has been closed."), navigation.navigate('Mano pacientai') }}>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "Avenir",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    textInput: {
        backgroundColor: colors.lightGrey,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.primary,
        textAlign: "center",
        paddingTop: 25,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
});
