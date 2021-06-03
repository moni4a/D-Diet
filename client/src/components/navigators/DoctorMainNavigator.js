import React from 'react';
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/Colors";
import DoctorAccountNavigator from "./DoctorAccountNavigator";
import DoctorHomeNavigator from "./DoctorHomeNavigator";
import RequestNavigator from "./RequestNavigator";
import Screen from "../Screen";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DoctorNavigator = () => {
    return (
        <Screen style={styles.container}>
            <Tab.Navigator
                initialRouteName="Mano pacientai"
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                    showLabel: false,
                    activeTintColor: colors.primary
                }}>
                <Tab.Screen
                    name="Doctor account"
                    component={DoctorAccountNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="user"
                                style={{ position: "relative" }}
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Mano pacientai"
                    component={DoctorHomeNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="list"
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Pacientų užklausos"
                    component={RequestNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account-question"
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default DoctorNavigator;