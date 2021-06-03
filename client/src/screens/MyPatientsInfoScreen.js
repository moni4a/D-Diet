import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import colors from "../config/Colors";
import AppButton from "../components/AppButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../API';

export default function MyPatientsInfoScreen({ navigation, route }) {
    const { id, name, surname, email } = route.params;

    const deletePatientRequest = () => {
        API.deletePatientRequest(
            { id },
            () => navigation.goBack(),
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }

    return (
        <View style={[styles.userInfoSection, { marginTop: 20 }]}>
            <View style={styles.row}>
                <Icon name="account" color="#619196" size={45} />
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20, paddingLeft: 45 }}>{surname}</Text>
            </View>
            <View style={styles.row}>
                <Icon name="email" color="#AAD9CD" size={45} />
                <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{email}</Text>
            </View>

            <AppButton title="Peržiūrėti profilio duomenis"
                onPress={() => navigation.navigate('Paciento profilis', { id })}
            />

            <AppButton title="Generuoti paciento ataskaitą"
                onPress={() => navigation.navigate('Paciento ataskaitos generavimas', { email })}
            />

            <Button title="Ištrinti paciento užklausą"
                color={colors.secondary} fontFamily="Avenir" fontWeight="bold" fontSize={30}
                onPress={deletePatientRequest}>
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
