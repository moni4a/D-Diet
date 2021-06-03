import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import PatientsRequestScreen from "../../screens/PatientsRequestScreen";
import PatientsRequestListScreen from "../../screens/PatientsRequestListScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Pacientų užklausos'
                component={PatientsRequestListScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF",
                }}
            />
            <Stack.Screen
                name='Užklausos informacija'
                component={PatientsRequestScreen}
                options={{
                    headerShown: true,
                    headerTitle: false,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Grįžti",
                    headerTintColor: "#FC766AFF"
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
        </Stack.Navigator>
    )
}

export default function AccountNavigator() {
    return <MyStack />
}