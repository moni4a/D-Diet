import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/AccountScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import DoctorsListScreen from "../../screens/DoctorsListScreen";
import DoctorsInformationScreen from "../../screens/DoctorsInformationScreen";
import LoginScreen from "../../screens/LoginScreen";
import MyDoctorsListScreen from "../../screens/MyDoctorsListScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Profilis'
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Redaguoti profilį'
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Gydytojų sąrašas'
                component={DoctorsListScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Mano gydytojų sąrašas'
                component={MyDoctorsListScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Gydytojo duomenys'
                component={DoctorsInformationScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Grįžti",
                    headerTintColor: "#FC766AFF",
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Prisijungimas'
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function AccountNavigator() {
    return <MyStack />
}