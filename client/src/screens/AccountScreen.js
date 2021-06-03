import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListItem from "../components/lists/ListItem";
import colors from "../config/Colors";
import Icon from "../components/Icon";
import { RoleContext } from '../provider/RoleProvider';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../API';

function AccountScreen({ navigation }) {
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
                            userInfo.map((user) => (
                                <View style={styles.listItemContainer} key={user}>
                                    <Icons name="account-circle" color="#97C1A9" size={60} />
                                    <View style={styles.nameSurnameContainer}>
                                        <Text style={{ fontSize: 22, fontFamily: "Avenir", fontWeight: "500" }}>{user.name} {user.surname}</Text>
                                    </View>
                                    <Text style={{ fontSize: 18, color: colors.medium }}>{user.email}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.container}>

                        <ListItem
                            title="Mano duomenys"
                            IconComponent={
                                <Icon name="book" backgroundColor={colors.primary} />
                            }
                            // onPress={() => this.props.navigation.navigate('Profile')}
                            onPress={() => navigation.navigate('Profilis')}
                        />
                        <ListItem
                            title="Gydytojų sąrašas"
                            IconComponent={
                                <Icon name="format-list-bulleted" backgroundColor="#86C5D8" />
                            }
                            onPress={() => navigation.navigate('Gydytojų sąrašas')}
                        />
                        <ListItem
                            title="Mano gydytojai"
                            IconComponent={
                                <Icon name="doctor" backgroundColor="#B399D4" />
                            }
                            onPress={() => navigation.navigate('Mano gydytojų sąrašas')}
                        />
                    </View>
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

export default AccountScreen;