import React from 'react';
import { Image, StyleSheet, View, Text, Button } from "react-native";
import * as Yup from 'yup'; // for data validation
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { RoleContext } from '../provider/RoleProvider';
import colors from '../config/Colors';
import API from '../API';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Įveskite el. pašto adresą").email("Įvestas neteisingas el. pašto adresas").label("Email"),
    password: Yup.string().required("Įveskite slaptažodį").min(6, "Įvestas neteisingas slaptažodis").label("Password")
});

function LoginScreen() {
    const navigation = useNavigation();

    return (
        <Screen style={styles.container}>
            <RoleContext.Consumer>
                {({ setUser }) => (
                    <>
                        <Image style={styles.logo} source={require("../assets/logo_text.jpg")} />

                        <AppForm
                            initialValues={{ email: "", password: "" }}
                            onSubmit={(credentials) => {
                                API.login(
                                    credentials,
                                    ({ email, role }) => setUser({ email, role }),
                                    (errMsg) => console.log(errMsg)
                                )
                            }}
                            validationSchema={validationSchema}
                        >
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email"
                                keyboardType="email-address"
                                name="email"
                                placeholder="El. paštas"
                                textContentType="emailAddress"
                            />
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                name="password"
                                placeholder="Slaptažodis"
                                secureTextEntry
                                textContentType="password"
                            />
                            <SubmitButton title="Prisijungti" />
                            <Divider style={{ backgroundColor: "#FFC8A2", height: 6, marginBottom: 10 }}></Divider>
                            <Text style={{ alignSelf: "center", fontSize: 18 }}>Neturite paskyros?</Text>
                            <Text style={{ alignSelf: "center", fontSize: 18 }}>Pasirinkite kaip norite registruotis</Text>
                            <View style={styles.registrationChoice} >
                                <TouchableOpacity onPress={() => navigation.navigate('Naudotojo registracija')}>
                                    <View style={styles.button}>
                                        <Text title="Naudotojas" style={styles.text}>NAUDOTOJAS</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Diabetologo registracija')}>
                                    <View style={styles.button}>
                                        <Text style={styles.text}>DIABETOLOGAS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </AppForm>
                    </>
                )}
            </RoleContext.Consumer>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white,
    },
    logo: {
        width: 140,
        height: 166,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 25,
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20,
        alignSelf: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        marginVertical: 10,
        height: 50,
        width: 200
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    registrationChoice: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
});

export default LoginScreen;