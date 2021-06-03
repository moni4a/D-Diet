import React from 'react';
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../config/Colors";
import HomeNavigator from "./HomeNavigator";
import AccountNavigator from "./AccountNavigator";
import ReportNavigator from "./ReportNavigator";
import Screen from "../Screen";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Screen style={styles.container}>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                    showLabel: false,
                    activeTintColor: colors.primary
                }}>
                <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
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
                    name="Home"
                    component={HomeNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="home"
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Report"
                    component={ReportNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="folder-open"
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

export default MainNavigator;