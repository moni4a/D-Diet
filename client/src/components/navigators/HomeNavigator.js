import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DailyRecordsScreen from "../../screens/DailyRecordsScreen";
import AddProductScreen from "../../screens/AddProductScreen";
import AddGlycemiaResultScreen from "../../screens/AddGlycemiaResultScreen";
import Table1 from "../../screens/replacementTables/table1";
import Table2 from "../../screens/replacementTables/table2";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Dienos įrašai'
                component={DailyRecordsScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Pridėti valgį'
                component={AddProductScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Atšaukti",
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Pridėti glikemijos rezultatą'
                component={AddGlycemiaResultScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: "Atšaukti",
                    headerTintColor: "#FC766AFF",
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Pirma pakaitos lentelė'
                component={Table1}
                options={{
                    headerShown: true,
                    headerBackTitle: "Grįžti",
                    headerTitle: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
            <Stack.Screen
                name='Antra pakaitos lentelė'
                component={Table2}
                options={{
                    headerShown: true,
                    headerBackTitle: "Grįžti",
                    headerTitle: false,
                    headerTintColor: "#FC766AFF"
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}