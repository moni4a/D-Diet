import React from "react";
import { StyleSheet, Text, } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/Colors";
import { RoleContext } from '../provider/RoleProvider';
import API from "../API";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Įveskite vardą").label("Name"),
    surname: Yup.string().required("Įveskite pavardę").label("Surname"),
    email: Yup.string().required("Įveskite el. pašto adresą").email("Įvestas neteisingas el. pašto adresas").label("Email"),
    password: Yup.string().required("Įveskite slaptažodį").min(6, "Slaptažodį turėtų sudaryti bent 6 simboliai").label("Password"),
});

function RegisterScreen() {

    return (
        <Screen style={styles.container}>
            <Text style={styles.title}> REGISTRACIJA </Text>
            <RoleContext.Consumer>
                {({ setUser }) => (
                    <AppForm
                        initialValues={{ name: "", surname: "", email: "", password: "" }}
                        onSubmit={(values) => {
                            API.registerDoctor(
                                values,
                                ({ email, role }) => setUser({ email, role }),
                                (errMsg) => console.log(errMsg)
                            )
                        }}
                        validationSchema={validationSchema}
                    >
                        <AppFormField
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Vardas"
                        />
                        <AppFormField
                            autoCorrect={false}
                            icon="account"
                            name="surname"
                            placeholder="Pavardė"
                        />
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="El. pašto adresas"
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
                        <SubmitButton title="Registruotis" />
                    </AppForm>
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
    picker: {
        backgroundColor: colors.lightGrey,
        borderRadius: 25,
        marginVertical: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.primary,
        textAlign: "center",
        paddingTop: 25,
        paddingBottom: 25,
    },
    button: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.secondary,
    },
});

export default RegisterScreen;