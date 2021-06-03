import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from "react-native";
import colors from "../config/Colors";
import { Divider, Provider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/AppButton';
import { useNavigation, useRoute } from "@react-navigation/native";
import API from "../API";
import { yyyymmdd, dateString2hhmm } from '../utils/datetime';

function DailyRecordsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [sex, setSex] = useState('');
    const [carbs, setCarbs] = useState('');
    const [glycemiaRecords, setGlycemiaRecords] = useState([]);
    const [modalVisible, setModalVisible] = useState(!!sex && !!carbs);
    const [nutrients, setNutrients] = useState({
        carb: '',
        fat: '',
        kcal: '',
        proteins: '',
    });

    const fetchVitals = () => {
        API.getDayRecords(
            ({ carb, fat, kcal, proteins }) => setNutrients({
                carb: Math.round(carb),
                fat: Math.round(fat),
                kcal: Math.round(kcal),
                proteins: Math.round(proteins),
            }),
            (err) => console.log(err),
        );
        API.getDayGlycemia(
            setGlycemiaRecords,
            (err) => console.log(err),
        );
    }

    useEffect(fetchVitals, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchVitals);
        return unsubscribe;
    }, [navigation]);



    useEffect(() => {

        const { sex, carbs, openModal } = route?.params ?? {};
        setModalVisible(!!sex && !!carbs && openModal);
        if (!!sex && !!carbs && openModal) {
            setSex(sex);
            setCarbs(carbs);
        }
    }, [nutrients]);

    const modalMessage = !!carbs && !!sex
        ? sex === "Vyras"
            ? carbs >= 75
                ? <Text style={styles.modalText}>Jūs viršijote rekomenduojamą angliavandenių kiekį. Užkandžiams ar esant per aukštam glikemijos kiekiui, rekomenduojama produktus pakeisti produktais, turinčiais mažiau angliavandenių. Galite pasirinkti produktus iš pateiktos lentelės</Text>
                : carbs <= 55 ? <Text style={styles.modalText}>Jūsų suvartotų angliavandenių kiekis nėra pakankamas. Rekomenduojamas kiekis 60-75 g. Galite pasirinkti produktus iš lentelės.</Text> : null
            : carbs >= 60
                ? <Text style={styles.modalText}>Jūs viršijote rekomenduojamą angliavandenių kiekį. Užkandžiams ar esant per aukštam glikemijos kiekiui, rekomenduojama produktus pakeisti produktais, turinčiais mažiau angliavandenių. Galite pasirinkti produktus iš pateiktos lentelės</Text>
                : carbs <= 40 ? <Text style={styles.modalText}>Jūsų suvartotų angliavandenių kiekis nėra pakankamas</Text> : null
        : null;

    const modalScreenName = !!carbs && !!sex
        ? sex === "Vyras"
            ? carbs >= 80
                ? 'Antra pakaitos lentelė'
                : carbs <= 60 ? 'Pirma pakaitos lentelė' : null
            : carbs >= 60
                ? 'Antra pakaitos lentelė'
                : carbs <= 45 ? 'Pirma pakaitos lentelė' : null
        : null;

    const carbsStr = Number.parseFloat(carbs).toFixed(2);

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: 5 }}>
                <Text
                    style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        borderColor: "#f5d5cb",
                        borderWidth: 6,
                        fontSize: 20,
                        textAlign: "center",
                        fontFamily: "Avenir",
                        fontWeight: "bold",
                        color: colors.secondary,
                    }}
                >
                    {yyyymmdd()}
                </Text>
            </View>

            <Text style={styles.myRecordsTitle}>Maistinės medžiagos</Text>

            <View style={styles.statsContainer} marginTop={10}>
                <View style={[styles.statsBox, { borderColor: "#E2F0CB", borderRightWidth: 8, borderLeftWidth: 8, borderTopWidth: 8, borderBottomWidth: 8 }]}>
                    <Text style={styles.title}>{nutrients.kcal}</Text>
                    <Text style={styles.subTitle}>KALORIJOS</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#B5EAD7", borderRightWidth: 8, borderLeftWidth: 8, borderTopWidth: 8, borderBottomWidth: 8 }]}>
                    <Text style={styles.title}>{nutrients.carb}</Text>
                    <Text style={styles.subTitle}>ANGLIAVANDENIAI</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={[styles.statsBox, { borderColor: "#C7CEEA", borderRightWidth: 8, borderLeftWidth: 8, borderTopWidth: 8, borderBottomWidth: 8 }]}>
                    <Text style={styles.title}>{nutrients.proteins}</Text>
                    <Text style={styles.subTitle}>BALTYMAI</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#FFDAC1", borderRightWidth: 8, borderLeftWidth: 8, borderTopWidth: 8, borderBottomWidth: 8 }]}>
                    <Text style={styles.title}>{nutrients.fat}</Text>
                    <Text style={styles.subTitle}>RIEBALAI</Text>
                </View>
            </View>

            <View style={styles.btnMenu} >
                <Button
                    onPress={() => navigation.navigate("Pridėti valgį", { title: 'Išsaugoti Pusryčius', type: 'BREAKFAST' })}
                    title="Pusryčiai"
                    small
                />
                <Button
                    onPress={() => navigation.navigate("Pridėti valgį", { title: 'Išsaugoti Pietus', type: 'LUNCH' })}
                    title="Pietūs"
                    small
                />
                <Button
                    onPress={() => navigation.navigate("Pridėti valgį", { title: 'Išsaugoti Vakarienę', type: 'DINNER' })}
                    title="Vakarienė"
                    small
                />
                <Button
                    onPress={() => navigation.navigate("Pridėti valgį", { title: 'Išsaugoti Užkandį', type: 'SNACK' })}
                    title="Užkandis"
                    small
                />
            </View>
            <Divider />

            <Text style={styles.myRecordsTitle}>Glikemija</Text>

            <View style={styles.glycemiaContainer} marginTop={10}>
                {
                    glycemiaRecords.map(({ amount, timestamp, id }) => (
                        <View style={styles.glycemiaBox} key={id}>
                            <Text style={styles.title}>{amount}</Text>
                            <Text style={styles.subTitle}>{dateString2hhmm(timestamp)}</Text>
                        </View>
                    ))
                }
            </View>

            <View style={[styles.btnMenu, { justifyContent: 'center' }]}>
                <Button
                    onPress={() => navigation.navigate("Pridėti glikemijos rezultatą")}
                    title="Pridėti glikemijos rezultatą"
                    small
                />
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Suvartotas angliavandenių kiekis: {carbsStr}</Text>
                            <View></View>
                            {modalMessage}
                            <TouchableHighlight
                                style={{
                                    ...styles.openButton,
                                    backgroundColor: colors.primary,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: "center",
                                    padding: 5,
                                    width: 270,
                                    height: 40,
                                    marginVertical: 10,
                                }}
                                onPress={() => {
                                    setModalVisible(false);
                                    route.params = {};
                                }}>
                                <Text style={styles.textStyle}>Uždaryti</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    ...styles.openButton,
                                    backgroundColor: colors.primary,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: "center",
                                    padding: 5,
                                    width: 270,
                                    height: 40,
                                    marginVertical: 10
                                }}
                                onPress={() => {
                                    setModalVisible(false);
                                    route.params = {};
                                    navigation.navigate(modalScreenName)
                                }}>
                                <Text style={styles.textStyle}>Atidaryti lentelę</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        position: "relative",
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 8,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        textTransform: "uppercase",
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 0,
        alignItems: "center",
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
    },
    myRecordsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.primary,
        textAlign: "center",
        paddingTop: 15,
        paddingBottom: 10,
    },
    btnMenu: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    glycemiaContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    glycemiaBox: {
        width: '25%',
        height: 60,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#00000055',
    },
    modalView: {
        backgroundColor: '#ffffff',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        marginVertical: 10,
    },
    textStyle: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    modalText: {
        fontSize: 20,
        alignSelf: "center",
        textAlign: "center",
        paddingBottom: 10,
        marginBottom: 10,
    },
});

export default () => (
    <Provider>
        <DailyRecordsScreen />
    </Provider>
);