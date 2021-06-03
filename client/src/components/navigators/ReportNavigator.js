import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import GenerateReportScreen from "../../screens/GenerateReportScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Ataskaitos'
                component={GenerateReportScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF",
                }}
            />
        </Stack.Navigator>
    )
}

export default function ReportNavigator() {
    return <MyStack />
}