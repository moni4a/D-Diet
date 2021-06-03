import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Button, Alert } from 'react-native';
import colors from "../config/Colors";
import AppText from "../../src/components/AppText";
import { useNavigation } from "@react-navigation/native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import API from '../API';

function PatientsRequestListScreen() {
    const navigation = useNavigation();
    const [patientsInfo, setPatientsInfo] = useState([]);

    const parsePatients = ({ patientsInfo }) => setPatientsInfo(patientsInfo.map(({
        id,
        name,
        surname,
        email,
        access_granted
    }) => ({
        id,
        name,
        surname,
        email,
        accessGranted: access_granted
    })));

    const grantPatientDoctorAccess = (id) => {
        API.grantPatientDoctorAccess(
            { id },
            () => API.getPatientsRequests(
                parsePatients,
                (errMsg) => console.log('klaida: ', errMsg)
            ),
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }

    const deletePatientRequest = (id) => {
        API.deletePatientRequest(
            { id },
            () => API.getPatientsRequests(
                parsePatients,
                (errMsg) => console.log('klaida: ', errMsg)
            ),
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }

    // Užkrovus langą
    useEffect(() => {
        API.getPatientsRequests(
            parsePatients,
            (errMsg) => console.log('klaida: ', errMsg)
        )
    }, []);

    // console.log(patientsInfo);

    return (
        <>
            {
                patientsInfo.map((patientsInfo) => (
                    <View underlayColor={colors.lightGrey} key={patientsInfo.id}>
                        <View style={styles.container}>
                            <Icons name="account-circle" color="#97C1A9" size={65} />
                            <View style={styles.detailsContainer}>
                                <AppText style={styles.title}>{patientsInfo.name} {patientsInfo.surname}</AppText>
                                <AppText style={styles.subTitle}>{patientsInfo.email}</AppText>
                                <Divider style={{ backgroundColor: "#f5d5cb", height: 3, marginTop: 6 }}></Divider>
                                <View style={styles.buttonsContainer}>
                                    <Button title="SUTIKTI PERŽIŪRĖTI"
                                        onPress={() => { Alert.alert("Pacientas pridėtas prie Jūsų pacientų sąrašo"), grantPatientDoctorAccess(patientsInfo.id) }}
                                        color={colors.primary} />
                                    <Button title="IŠTRINTI"
                                        onPress={() => { Alert.alert("Paciento užklausa ištrinta"), deletePatientRequest(patientsInfo.id) }}
                                        color={colors.primary} />
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: 25,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: colors.light,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
        justifyContent: "space-between",
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        backgroundColor: colors.white,
        marginBottom: 5
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontWeight: "700",
    },
    subTitle: {
        color: colors.darkGrey,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 0,
    },
});

export default PatientsRequestListScreen;