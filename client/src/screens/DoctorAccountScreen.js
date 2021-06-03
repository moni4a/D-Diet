import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListItem from "../components/lists/ListItem";
import colors from "../config/Colors";
import Icon from "../components/Icon";
import { RoleContext } from '../provider/RoleProvider';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../API';

function DoctorAccountScreen() {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        API.getUserInfo(
            ({ userInfo }) => setUserInfo(userInfo.map(({ id, name, surname, email }) => ({ id, name, surname, email }))),
            (errMsg) => console.log('klaida: ', errMsg)
        )
    }, [])

    return (
        <RoleContext.Consumer>
            {({ logout }) => (
                <>
                    <View>
                        {
                            userInfo.map((userInfo) => (
                                <View style={styles.listItemContainer} key={userInfo}>
                                    <Icons name="account-circle" color="#8fcaca" size={60} />
                                    <View style={styles.nameSurnameContainer}>
                                        <Text style={{ fontSize: 22, fontFamily: "Avenir", fontWeight: "500" }}>{userInfo.name} {userInfo.surname}</Text>
                                    </View>
                                    <Text style={{ fontSize: 18, color: colors.medium }}>{userInfo.email}</Text>
                                </View>
                            ))
                        }
                    </View>

                    <View style={styles.container}>
                        <ListItem
                            title="Atsijungti"
                            IconComponent={
                                <Icon name="logout" backgroundColor="#ffe66d" />
                            }
                            onPress={() => {
                                API.logout(
                                    logout,
                                    (errMsg) => console.log(errMsg)
                                )
                            }}
                        />
                    </View>
                </>
            )}
        </RoleContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: colors.lightGrey,
    },
    listItemContainer: {
        alignItems: "center",
        padding: 15,
        backgroundColor: colors.white,
    },
    nameSurnameContainer: {
        flexDirection: "row",
        alignSelf: "center",
    },
});

export default DoctorAccountScreen;