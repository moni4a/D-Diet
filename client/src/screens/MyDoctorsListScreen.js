import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/Colors";
import AppText from "../../src/components/AppText";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import API from '../API';

function MyDoctorsListScreen(props) {

  const [myDoctorsInfo, setMyDoctorsInfo] = useState([]);

  const parseDoctors = ({ myDoctorsInfo }) =>
    setMyDoctorsInfo(myDoctorsInfo.map(({
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

  const cancelDoctorPermissionAccess = (id) => {
    API.cancelDoctorPermissionAccess(
      { id },
      () => API.getMyDoctorsInfo(
        parseDoctors,
        (errMsg) => console.log('klaida: ', errMsg)
      ),
      (errMsg) => console.log('klaida: ', errMsg)
    );
  }

  useEffect(() => {
    API.getMyDoctorsInfo(
      parseDoctors,
      (errMsg) => console.log('klaida: ', errMsg)
    )
  }, []);

  console.log(myDoctorsInfo);

  return (
    <View>
      <View>
        {
          myDoctorsInfo.map((myDoctorsInfo) => (
            <View underlayColor={colors.lightGrey} key={myDoctorsInfo.id}>
              <View style={styles.container}>
                <Icons name="account-circle" color="#97C1A9" size={65} />
                <View style={styles.detailsContainer}>
                  <AppText style={styles.title}>{myDoctorsInfo.name} {myDoctorsInfo.surname}</AppText>
                  <AppText style={styles.subTitle}>{myDoctorsInfo.email}</AppText>
                  <Divider style={{ backgroundColor: "#f5d5cb", height: 3, marginTop: 6 }}></Divider>
                  <View style={styles.buttonsContainer}>
                    <Button color={colors.primary}
                      title="ATŠAUKTI PRIEIGĄ"
                      onPress={() => { Alert.alert("Gydytojo prieiga atšaukta"), cancelDoctorPermissionAccess(myDoctorsInfo.id) }}></Button>
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

export default MyDoctorsListScreen;