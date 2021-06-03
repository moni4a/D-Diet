import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DoctorAccountScreen from "../../screens/DoctorAccountScreen";
import LoginScreen from "../../screens/LoginScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Doctor account'
                component={DoctorAccountScreen}
                options={{
                    headerShown: true,
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

export default function DoctorAccountNavigator() {
    return <MyStack />
}