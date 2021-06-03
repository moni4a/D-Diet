import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from "../../src/components/AppText";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../API';

function MyPatientsScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [myPatients, setMyPatients] = useState([]);

    const parsePatients = ({ patientsInfo }) => setMyPatients(patientsInfo.map(({
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

    const handleSearchChange = (text) => {
        API.getPatients(
            text,
            parsePatients,
            (errMsg) => console.log('klaida: ', errMsg)
        );
        setSearch(text);
    }

    useEffect(() => {
        API.getPatients(
            '',
            parsePatients,
            (errMsg) => console.log('klaida: ', errMsg)
        );
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            API.getPatients(
                '',
                parsePatients,
                (errMsg) => console.log('klaida: ', errMsg)
            );
        });

        return unsubscribe;
    }, [navigation]);

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
                        placeholder="Ieškoti paciento"
                        value={search}
                        onChangeText={handleSearchChange}
                    />
                </View>
            </SafeAreaView>

            <ScrollView>
                {
                    myPatients.map(({ id, name, surname, email }) => (
                        <TouchableHighlight
                            underlayColor={colors.lightGrey}
                            onPress={() => navigation.navigate("Paciento informacija", { id, name, surname, email })} key={id}
                        >
                            <View style={styles.container}>
                                <Icons name="account-circle" color="#97C1A9" size={60} />
                                <View style={styles.detailsContainer}>
                                    <AppText style={styles.title}>{name} {surname}</AppText>
                                    <AppText style={styles.subTitle}>{email}</AppText>
                                </View>
                                <MaterialCommunityIcons color={colors.medium} name="eye" size={25} />
                            </View>
                        </TouchableHighlight>
                    ))
                }
            </ScrollView>
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
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
        marginBottom: 10,
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

export default MyPatientsScreen;