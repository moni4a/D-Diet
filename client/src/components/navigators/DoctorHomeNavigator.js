import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MyPatientsScreen from '../../screens/MyPatientsScreen';
import MyPatientsProfileScreen from "../../screens/MyPatientsProfileScreen";
import DoctorAccountScreen from "../../screens/DoctorAccountScreen";
import MyPatientsInfoScreen from "../../screens/MyPatientsInfoScreen";
import MyPatientsReportScreen from "../../screens/MyPatientsReportScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Mano pacientai'
                component={MyPatientsScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Doctor account'
                component={DoctorAccountScreen}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Paciento informacija'
                component={MyPatientsInfoScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Paciento profilis'
                component={MyPatientsProfileScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Paciento ataskaitos generavimas'
                component={MyPatientsReportScreen}
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