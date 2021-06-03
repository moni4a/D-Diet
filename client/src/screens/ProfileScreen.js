import React, { useState, useEffect } from 'react';
import Screen from "../components/Screen";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome5 } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import API from '../API';
import { yyyymmdd } from '../utils/datetime';

function ProfileScreen({ navigation }) {

    const [userProfileInfo, setProfileInfo] = useState([]);

    const saveProfileInfo = () => API.getAllInfo(
        ({ userProfileInfo }) => setProfileInfo({
            ...userProfileInfo,
            weight: "" + userProfileInfo.weight,
            height: "" + userProfileInfo.height,
            glycemia_min: "" + userProfileInfo.glycemia_min,
            glycemia_max: "" + userProfileInfo.glycemia_max,
            calories: "" + userProfileInfo.calories,
            birth_date: yyyymmdd(userProfileInfo.birth_date)
        }),
        (errMsg) => console.log('klaida: ', errMsg)
    )

    useEffect(saveProfileInfo, []);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', saveProfileInfo);
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView>
            <Screen >
                <TextInput style={styles.title}> MANO DUOMENYS </TextInput>
                <View style={styles.userInfoSection} key={userProfileInfo}>
                    <View style={styles.rowForName}>
                        <View style={styles.row}>
                            <Icon name="account" color="#c29ba3" size={45} />
                            <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ color: "#4F6367", marginLeft: 5, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.surname}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#AAD9CD" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="human-male-female" color="#685268" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.sex}</Text>
                    </View>
                    <View style={styles.row}></View>
                    <View style={styles.row}>
                        <Icon name="cake-variant" color="#8DA47E" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.birth_date}</Text>
                    </View>
                    <View style={styles.row}></View>

                    <Text style={styles.subTitle}>ŪGIS (cm)</Text>
                    <View style={styles.row}>
                        <Icon name="human-male-height" color="#957DAD" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.height}</Text>
                    </View>

                    <Text style={styles.subTitle}>SVORIS (kg)</Text>
                    <View style={styles.row}>
                        <Icons name="weight" color="#96b3c2" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.weight}</Text>
                    </View>

                    <Text style={styles.subTitle}>GLIKEMIJOS NORMOS (mmol/l)</Text>
                    <View style={styles.rowOfTotals}>
                        <View style={styles.elementOfTotal} padding={25}>
                            <Text style={styles.miniTitle}> Minimali reikšmė</Text>
                            <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.glycemia_min}</Text>
                        </View>
                        <View style={styles.elementOfTotal} padding={25}>
                            <Text style={styles.miniTitle}>Maksimali reikšmė</Text>
                            <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.glycemia_max}</Text>
                        </View>
                    </View>

                    <Text style={[styles.subTitle, { marginBottom: 12 }]}> DIABETO TIPAS </Text>
                    <View style={styles.row}>
                        <Icon name="hospital-box-outline" color="#c05780" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.diabetes_type}</Text>
                    </View>

                    <Text style={[styles.subTitle, { marginBottom: 12 }]}> MEDIKAMENTAI </Text>
                    <View style={styles.row}>
                        <Icons name="briefcase-medical" color="#bc7576" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 20, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.medication}</Text>
                    </View>

                    <Text style={[styles.subTitle, { marginBottom: 12 }]}> NORIMAS SUVARTOTI KALORIJŲ KIEKIS PER PARĄ </Text>
                    <View style={styles.row}>
                        <FontAwesome5 name="kickstarter-k" color="#6c88c4" size={45} />
                        <Text style={{ color: "#4F6367", marginLeft: 35, alignSelf: "center", fontSize: 20 }}>{userProfileInfo?.calories}</Text>
                    </View>
                </View>
                <AppButton title="Redaguoti duomenis"
                    onPress={() => navigation.navigate('Redaguoti profilį', { data: userProfileInfo })}
                />
            </Screen>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.primary,
        textAlign: "center",
        paddingTop: 25,
        paddingBottom: 25,
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
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    miniTitle: {
        fontSize: 20,
    },
    rowOfTotals: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        width: '100%',
        height: 75,
        marginVertical: 20,
        justifyContent: "space-evenly",
        marginBottom: 0,
    },
    title3: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    elementOfTotal: {
        justifyContent: 'center',
    },
    rowForName: {
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
});

export default ProfileScreen;