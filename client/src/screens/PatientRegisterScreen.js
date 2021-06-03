import React from "react";
import { StyleSheet, Text, } from "react-native";
import * as Yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppFormSelect from "../components/forms/AppFormSelect";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/Colors";
import { RoleContext } from '../provider/RoleProvider';
import API from "../API";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Įveskite vardą").label("Name"),
  surname: Yup.string().required("Įveskite pavardę").label("Surname"),
  email: Yup.string().required("Įveskite el. pašto adresą").email("Įvestas neteisingas el. pašto adresas").label("Email"),
  birth_date: Yup.string()
    .required("Įveskite gimimo datą")
    .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Datos formatas turėtų būti YYYY-DD-MM')
    .label("birth_date"),
  sex: Yup.string().oneOf(['Moteris', 'Vyras']).required("Pažymėkite savo lytį").label("sex"),
  height: Yup.number().transform((o, v) => parseFloat(v.replace(/,/g, '.'))).positive().required("Įveskite savo ūgį").label("height"),
  weight: Yup.number().transform((o, v) => parseFloat(v.replace(/,/g, '.'))).positive().required("Įveskite savo svorį").label("weight"),
  glycemia_min: Yup.number().positive().required("Įveskite minimalų galimą glikemijos rezultatą").label("glycemia_min"),
  glycemia_max: Yup.number().positive().required("Įveskite maksimalų galimą glikemijos rezultatą").label("glycemia_max"),
  diabetes_type: Yup.string().oneOf(['1 tipo', '2 tipo', 'Gestacinis', 'Prediabetas', 'Kita']).required("Pasirinkite savo diabeto tipą").label("Role"),
  medication: Yup.string().oneOf(['Insulino pompa', 'Insulino pieštukas', 'Tabletės', 'Nevartoju'], 'Pasirinkite vieną variantą').required("Pasirinkite kokią paskyrą norite susikurti").label("Role"),
  calories: Yup.number().positive().required("Įveskite norimą suvartoti per parą kalorijų kiekį").label("calories"),
  password: Yup.string().required("Įveskite slaptažodį").min(6, "Slaptažodį turėtų sudaryti bent 6 simboliai").label("Password"),
});

function PatientRegisterScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> REGISTRACIJA </Text>
      <RoleContext.Consumer>
        {({ setUser }) => (
          <AppForm
            initialValues={{
              name: "", surname: "", email: "", birth_date: "", sex: "", height: "", weight: "",
              glycemia_min: "", glycemia_max: "", diabetes_type: "", medication: "", calories: "", password: ""
            }}
            onSubmit={(values) => {
              API.registerPatient(
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
              autoCorrect={false}
              icon="cake-variant"
              name="birth_date"
              placeholder="Gimimo data"
              keyboardType="numbers-and-punctuation"
            />
            <AppFormSelect
              style={{
                backgroundColor: colors.lightGrey, borderTopLeftRadius: 25, borderTopRightRadius: 25,
                borderBottomLeftRadius: 25, borderBottomRightRadius: 25
              }}
              name="sex"
              containerStyle={{ height: 55, marginVertical: 10 }}
              labelStyle={{
                fontSize: 18,
                fontFamily: "Avenir",
                textAlign: 'left',
                color: colors.medium
              }}
              items={[
                { label: 'Moteris', value: 'Moteris' },
                { label: 'Vyras', value: 'Vyras' },
              ]}
              defaultIndex={0}
              placeholder="Jūsų lytis"
            />
            <AppFormField
              autoCorrect={false}
              icon="human-male-height"
              name="height"
              placeholder="Ūgis"
              keyboardType="number-pad"
            />
            <AppFormField
              autoCorrect={false}
              icon="weight"
              name="weight"
              placeholder="Svoris"
              keyboardType="numeric"
            />
            <AppFormSelect
              style={{
                backgroundColor: colors.lightGrey, borderTopLeftRadius: 25, borderTopRightRadius: 25,
                borderBottomLeftRadius: 25, borderBottomRightRadius: 25
              }}
              name="diabetes_type"
              containerStyle={{ height: 55, marginVertical: 10 }}
              labelStyle={{
                fontSize: 18,
                fontFamily: "Avenir",
                textAlign: 'left',
                color: colors.medium
              }}
              items={[
                { label: '1 tipo', value: '1 tipo' },
                { label: '2 tipo', value: '2 tipo' },
                { label: 'Gestacinis', value: 'Gestacinis' },
                { label: 'Prediabetas', value: 'Prediabetas' },
                { label: 'Kita', value: 'Kita' },
              ]}
              defaultIndex={0}
              placeholder="Diabeto tipas"
            />
            <AppFormField
              autoCorrect={false}
              icon="format-vertical-align-bottom"
              name="glycemia_min"
              placeholder="Minimali glikemijos reikšmė (mmol/l)"
              keyboardType="number-pad"
            />
            <AppFormField
              autoCorrect={false}
              icon="format-vertical-align-top"
              name="glycemia_max"
              placeholder="Maksimali glikemijos reikšmė (mmol/l)"
              keyboardType="number-pad"
            />
            <AppFormSelect
              style={{
                backgroundColor: colors.lightGrey, borderTopLeftRadius: 25, borderTopRightRadius: 25,
                borderBottomLeftRadius: 25, borderBottomRightRadius: 25
              }}
              name="medication"
              containerStyle={{ height: 55, marginVertical: 10 }}
              labelStyle={{
                fontSize: 18,
                fontFamily: "Avenir",
                textAlign: 'left',
                color: colors.medium
              }}
              items={[
                { label: 'Insulino pompa', value: 'Insulino pompa' },
                { label: 'Insulino pieštukas', value: 'Insulino pieštukas' },
                { label: 'Tabletės', value: 'Tabletės' },
                { label: 'Nevartoju', value: 'Nevartoju' },
              ]}
              defaultIndex={0}
              placeholder="Vartojami medikamentai"
            />
            <AppFormField
              autoCorrect={false}
              icon="alpha-k-box-outline"
              name="calories"
              placeholder="Kalorijų kiekis per parą"
              keyboardType="number-pad"
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
    </ScrollView>
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

export default PatientRegisterScreen;