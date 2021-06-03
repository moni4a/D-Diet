import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from "../config/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '../components/AppButton';
import { FontAwesome5 } from '@expo/vector-icons';
import API from '../API';
import * as Yup from "yup";
import { useFormik } from 'formik';

const validationSchema = Yup.object({
    name: Yup.string().label("Name"),
    surname: Yup.string().label("Surname"),
    birth_date: Yup.string()
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Datos formatas turėtų būti YYYY-DD-MM')
        .label("birth_date"),
    email: Yup.string().email("Įvestas neteisingas el. pašto adresas").label("Email"),
    height: Yup.number().positive().required("Įveskite savo ūgį").label("height"),
    weight: Yup.number().transform((o, v) => parseFloat(v.replace(/,/g, '.'))).positive().required("Įveskite savo svorį").label("weight"),
    glycemia_min: Yup.string()
        .matches(/^[0-9]+([.]{0,1}[0-9]+)?$/, "Norint išsaugoti rezultatą, reikia įvesti teisingą skaitinę reikšmę")
        .label("glycemia_min"),
    glycemia_max: Yup.string()
        .matches(/^[0-9]+([.]{0,1}[0-9]+)?$/, "Norint išsaugoti rezultatą, reikia įvesti teisingą skaitinę reikšmę")
        .label("glycemia_max"),
    diabetes_type: Yup.string().oneOf(['1 tipo', '2 tipo', 'Gestacinis', 'Prediabetas', 'Kita']).label("Role"),
    medication: Yup.string().oneOf(['Insulino pompa', 'Insulino pieštukas', 'Tabletės', 'Nevartoju'], 'Role must be PATIENT or DOCTOR').label("Role"),
    calories: Yup.number().positive().label("calories"),
});

const EditProfileScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [isEnabled, setIsEnabled] = useState(false);

    const editPatient = (fields) => {
        API.updateUserInfo(
            fields,
            () => navigation.goBack(),
            (errMsg) => console.log('klaida: ', errMsg)
        )
    }

    const formik = useFormik({
        onSubmit: editPatient,
        initialValues: data,
        validationSchema
    })

    return (
        <View marginBottom={30} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}> PROFILIO REDAGAVIMAS </Text>

                        <View style={styles.action}>
                            {/* <FontAwesome name="user-o" color={colors.darkGrey} size={20} /> */}
                            <Icon name="account" color="#619196" size={35} />
                            <TextInput
                                placeholder="Vardas"
                                placeholderTextColor={colors.darkGrey}
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.name}
                                onChangeText={(name) => formik.setFieldValue('name', name, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.name ? formik.errors.name : null}</Text>

                        <View style={styles.action}>
                            {/* <FontAwesome name="user-o" color="#666666" size={20} /> */}
                            <Icon name="account" color="#619196" size={35} />
                            <TextInput
                                placeholder="Pavardė"
                                placeholderTextColor={colors.darkGrey}
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.surname}
                                onChangeText={(surname) => formik.setFieldValue('surname', surname, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.surname ? formik.errors.surname : null}</Text>

                        <DropDownPicker
                            style={{
                                backgroundColor: "#ECECEC"
                            }}
                            containerStyle={{ height: 55, marginVertical: 10 }}
                            labelStyle={{
                                fontSize: 18,
                                fontFamily: "Avenir",
                                textAlign: 'left',
                                color: colors.darkGrey
                            }}
                            items={[
                                { label: 'Vyras', value: 'Vyras' },
                                { label: 'Moteris', value: 'Moteris' },
                            ]}
                            // defaultIndex={0}
                            placeholder="Jūsų lytis"
                            defaultValue={formik.values.sex}
                            onChangeItem={item => formik.setFieldValue('sex', item.sex, true)}
                        />
                        <Text style={{ color: 'red' }}>{formik.errors.sex ? formik.errors.sex : null}</Text>

                        <View style={styles.action}>
                            <Icon name="cake-variant" color="#8DA47E" size={35} />
                            <TextInput
                                placeholder="Gimimo data"
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="numbers-and-punctuation"
                                autoCorrect={false}
                                fontSize={18}
                                id="birth_date"
                                name="birth_date"
                                value={formik.values.birth_date}
                                onChangeText={(birth_date) => formik.setFieldValue('birth_date', birth_date, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.birth_date ? formik.errors.birth_date : null}</Text>

                        <View style={styles.action}>
                            <Icon name="human-male-height" color="#957DAD" size={35} />
                            <TextInput
                                placeholder="Ūgis"
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.height}
                                onChangeText={(height) => formik.setFieldValue('height', height, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.height ? formik.errors.height : null}</Text>

                        <View style={styles.action}>
                            <Icons name="weight" color="#97A2FF" size={35} />
                            <TextInput
                                placeholder="Svoris"
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="numeric"
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.weight}
                                onChangeText={(weight) => formik.setFieldValue('weight', weight, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.weight ? formik.errors.weight : null}</Text>

                        <Text style={styles.title3}>Minimali glikemijos reikšmė (mmol/l)</Text>
                        <View style={styles.action}>
                            <IconEntypo name="align-bottom" color="#F8B195" size={45} />
                            <TextInput
                                placeholder="4"
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.glycemia_min}
                                onChangeText={(glycemia_min) => formik.setFieldValue('glycemia_min', glycemia_min, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.glycemia_min ? formik.errors.glycemia_min : null}</Text>

                        <Text style={styles.title3}>Maksimali glikemijos reikšmė (mmol/l)</Text>
                        <View style={styles.action}>
                            <IconEntypo name="align-top" color="#F8B195" size={45} />
                            <TextInput
                                placeholder="9"
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.glycemia_max}
                                onChangeText={(glycemia_max) => formik.setFieldValue('glycemia_max', glycemia_max, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.glycemia_max ? formik.errors.glycemia_max : null}</Text>

                        <Text style={styles.subTitle}> DIABETO TIPAS </Text>
                        <DropDownPicker
                            style={{
                                backgroundColor: "#ECECEC"
                            }}
                            containerStyle={{ height: 55, marginVertical: 10, marginBottom: 40 }}
                            labelStyle={{
                                fontSize: 18,
                                fontFamily: "Avenir",
                                textAlign: 'left',
                                color: colors.darkGrey
                            }}
                            items={[
                                { label: '1 tipo', value: '1 tipo' },
                                { label: '2 tipo', value: '2 tipo' },
                                { label: 'Gestacinis', value: 'Gestacinis' },
                                { label: 'Prediabetas', value: 'Prediabetas' },
                                { label: 'Kita', value: 'Kita' },
                            ]}
                            // defaultIndex={0}
                            placeholder="Diabeto tipas"
                            defaultValue={formik.values.diabetes_type}
                            onChangeItem={item => formik.setFieldValue('diabetes_type', item.diabetes_type, true)}
                        />
                        <Text style={{ color: 'red' }}>{formik.errors.diabetes_type ? formik.errors.diabetes_type : null}</Text>

                        <Text style={[styles.subTitle, { marginBottom: 12 }]}> MEDIKAMENTAI </Text>
                        <DropDownPicker
                            style={{
                                backgroundColor: "#ECECEC"
                            }}
                            containerStyle={{ height: 55, marginVertical: 10, marginBottom: 50 }}
                            labelStyle={{
                                fontSize: 18,
                                fontFamily: "Avenir",
                                textAlign: 'left',
                                color: colors.darkGrey
                            }}
                            items={[
                                { label: 'Insulino pompa', value: 'Insulino pompa' },
                                { label: 'Insulino pieštukas', value: 'Insulino pieštukas' },
                                { label: 'Tabletės', value: 'Tabletės' },
                                { label: 'Nevartoju', value: 'Nevartoju' },
                            ]}
                            // defaultIndex={0}
                            placeholder="Medikamentai"
                            defaultValue={formik.values.medication}
                            onChangeItem={item => formik.setFieldValue('medication', item.medication, true)}
                        />
                        <Text style={{ color: 'red' }}>{formik.errors.medication ? formik.errors.medication : null}</Text>

                        <Text style={[styles.subTitle, { marginBottom: 12 }]}> NORIMAS SUVARTOTI KALORIJŲ KIEKIS PER PARĄ </Text>
                        <View style={styles.action}>
                            <FontAwesome5 name="kickstarter-k" color="#6c88c4" size={45} />
                            <TextInput
                                placeholderTextColor={colors.darkGrey}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                fontSize={18}
                                value={formik.values.calories}
                                onChangeText={(calories) => formik.setFieldValue('calories', calories, true)}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.darkGrey,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.calories ? formik.errors.calories : null}</Text>

                        <AppButton title="Išsaugoti"
                            // onPress={editPatient} 
                            onPress={formik.handleSubmit}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        paddingLeft: 10
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: colors.primary,
        textAlign: "center",
        paddingTop: 25,
        paddingBottom: 25,
    },
    title3: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: "#6C5B7B",
        paddingLeft: 10,
        marginTop: 15,
    },
    checkbox: {
        fontSize: 18,
        color: colors.secondary,
        backgroundColor: colors.primary,
    },
    switch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default EditProfileScreen;