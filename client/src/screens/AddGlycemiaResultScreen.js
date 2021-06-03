import React, { useContext } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import colors from "../config/Colors";
import API from '../API';
import { useFormik } from 'formik';
import { RoleContext } from '../provider/RoleProvider';
import AppButton from "../components/AppButton";
import * as Yup from "yup";

const validationSchema = Yup.object({
    amount: Yup.string()
        .matches(/^[0-9]+([.]{0,1}[0-9]+)?$/, "Norint išsaugoti rezultatą, reikia įvesti teisingą skaitinę reikšmę")
        .required("Laukas yra privalomas"),
});

function AddGlycemiaResultScreen({ navigation, route }) {
    const onSubmit = ({ amount }) => {
        API.addGlycemiaResult(
            { email, amount },
            () => navigation.goBack(),
            (err) => { console.log(err) },
        )
    }

    const { user } = useContext(RoleContext);
    const email = user.email;

    const formik = useFormik({
        onSubmit,
        initialValues: { amount: '' },
        validationSchema
    })

    return (
        <View style={{
            marginTop: 0,
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: colors.white,
        }}>
            <Text style={[styles.title, { marginTop: 30, marginBottom: 40 }]}>Įveskite glikemijos rezultatą</Text>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                id="amount"
                name="amount"
                placeholder="Rezultatas"
                value={formik.values.amount}
                onChangeText={(text) => formik.setFieldValue('amount', text.replace(/,/g, '.'), true)}
            />
            <Text style={{ color: 'red' }}>{formik.errors.amount ? formik.errors.amount : null}</Text>
            <AppButton
                title="Išsaugoti"
                onPress={formik.handleSubmit}
            />
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
});

export default AddGlycemiaResultScreen;