import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import PatientRegisterScreen from "../../screens/PatientRegisterScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Prisijungimas'
                component={LoginScreen}
                options={{
                    headerShown: true,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Naudotojo registracija'
                component={PatientRegisterScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Grįžti",
                    headerTintColor: "#FC766AFF",
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Diabetologo registracija'
                component={RegisterScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Grįžti",
                    headerTintColor: "#FC766AFF",
                    headerTitle: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function LoginNavigator() {
    return <MyStack />
}