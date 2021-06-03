import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/Colors";
import AppText from "../../src/components/AppText";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import API from '../API';

function DoctorsListScreen() {
    const [search, setSearch] = useState("");
    const [doctorsInfo, setDoctorsInfo] = useState([]);

    const parseDoctors = ({ doctorsInfo }) => setDoctorsInfo(doctorsInfo.map(({
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

    const createDoctorPermissionAccess = (id) => {
        API.createDoctorPermissionAccess(
            { id },
            () => API.getDoctorsInfo(
                search,
                parseDoctors,
                (errMsg) => console.log('klaida: ', errMsg)
            ),
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }

    const cancelDoctorPermissionAccess = (id) => {
        API.cancelDoctorPermissionAccess(
            { id },
            () => API.getDoctorsInfo(
                search,
                parseDoctors,
                (errMsg) => console.log('klaida: ', errMsg)
            ),
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }

    // Pakeitus paieškos lauką
    const handleSearchChange = (text) => {
        API.getDoctorsInfo(
            text,
            parseDoctors,
            (errMsg) => console.log('klaida: ', errMsg)
        );
        setSearch(text);
    }

    // Užkrovus langą
    useEffect(() => {
        API.getDoctorsInfo(
            '',
            parseDoctors,
            (errMsg) => console.log('klaida: ', errMsg)
        )
    }, []);

    // console.log(doctorsInfo);

    return (
        <View>
            <SafeAreaView style={{
                marginTop: 20,
                marginBottom: 15,
                flexDirection: 'row',
                paddingHorizontal: 20
            }}>
                <View style={styles.inputContainer}>
                    <Icon name="search" size={28} />
                    <TextInput
                        style={{ flex: 1, fontSize: 18, paddingLeft: 10 }}
                        placeholder="Ieškoti gydytojo"
                        value={search}
                        onChangeText={handleSearchChange}
                    />
                </View>
            </SafeAreaView>

            <View>
                {
                    doctorsInfo.map((doctorsInfo) => (
                        <View underlayColor={colors.lightGrey} key={doctorsInfo.id}>
                            <View style={styles.container}>
                                <Icons name="account-circle" color="#97C1A9" size={65} />
                                <View style={styles.detailsContainer}>
                                    <AppText style={styles.title}>{doctorsInfo.name} {doctorsInfo.surname}</AppText>
                                    <AppText style={styles.subTitle}>{doctorsInfo.email}</AppText>
                                    <Divider style={{ backgroundColor: "#f5d5cb", height: 3, marginTop: 6 }}></Divider>
                                    <View style={styles.buttonsContainer}>
                                        <Button color={colors.primary}
                                            title={doctorsInfo.accessGranted === null
                                                ? "PRAŠYTI PERŽIŪRĖTI ATASKAITAS"
                                                : doctorsInfo.accessGranted === 0
                                                    ? "ATŠAUKTI PRAŠYMĄ"
                                                    : "ATŠAUKTI PRIEIGĄ"}
                                            onPress={() => doctorsInfo.accessGranted === null
                                                ? createDoctorPermissionAccess(doctorsInfo.id)
                                                : cancelDoctorPermissionAccess(doctorsInfo.id)}></Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: 30,
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
        padding: 15,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontWeight: "500",
    },
    subTitle: {
        color: colors.medium,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
});

export default DoctorsListScreen;